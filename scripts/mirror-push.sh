#!/usr/bin/env bash
# 本地手动镜像推送：把本仓库的 main 与全部 tag 推送到备份仓库。
#
# 为什么需要它：
#   本仓库 .git 约 190MB（55 个版本 tag，每版含 APK）。跨境推一条 190MB 的长连接
#   很容易在几分钟后被网络掐断（fatal: the remote end hung up unexpectedly），
#   而 git push 不可续传，一断就得整包重来。
#   本脚本把推送拆成一串小连接：先按 5 个一批推 tag，最后推 main。
#   等 tag 对象都落到服务端后，main 只剩极小增量，几乎不会再断。
#
# 用法：
#   bash scripts/mirror-push.sh                 # 推送脚本里默认的两个备份仓库
#   bash scripts/mirror-push.sh yangjibao-      # 只补推某一个
#   DRY_RUN=1 bash scripts/mirror-push.sh       # 预演，不真正写入

set -uo pipefail

OWNER="${OWNER:-zxwk1998}"
BATCH="${BATCH:-5}"   # 每批推送的 tag 数量
RETRY="${RETRY:-4}"   # 每批最多尝试次数
DRY_RUN="${DRY_RUN:-0}"

TARGETS=("$@")
if [ ${#TARGETS[@]} -eq 0 ]; then
  TARGETS=(xiaobeiyangji yangjibao-)
fi

# 长连接保活：避免空闲被中间设备静默断开
export GIT_SSH_COMMAND="ssh -o ServerAliveInterval=15 -o ServerAliveCountMax=20 -o TCPKeepAlive=yes"

PUSH_ARGS=(--force)
[ "$DRY_RUN" = "1" ] && PUSH_ARGS+=(--dry-run)

# push_try <url> <refspec...>：失败自动重试，最终失败返回 1
push_try() {
  local url="$1"; shift
  local n=0 out=""
  while [ "$n" -lt "$RETRY" ]; do
    n=$((n + 1))
    if out=$(git push "${PUSH_ARGS[@]}" "$url" "$@" 2>&1); then
      return 0
    fi
    echo "      ↳ 第 $n/$RETRY 次失败：$(printf '%s\n' "$out" | tail -1)" >&2
    [ "$n" -lt "$RETRY" ] && sleep 5
  done
  return 1
}

FAILED=0
for repo in "${TARGETS[@]}"; do
  URL="git@github.com:${OWNER}/${repo}.git"
  echo "== ${OWNER}/${repo} =="

  i=0
  batch=()
  while read -r ref; do
    [ -n "$ref" ] || continue
    batch+=("${ref}:${ref}")
    i=$((i + 1))
    if [ $((i % BATCH)) -eq 0 ]; then
      printf '   tag %02d-%02d ... ' "$((i - BATCH + 1))" "$i"
      if push_try "$URL" "${batch[@]}"; then echo "OK"; else echo "失败"; FAILED=1; fi
      batch=()
    fi
  done < <(git for-each-ref --format='%(refname)' refs/tags)

  if [ ${#batch[@]} -gt 0 ]; then
    printf '   tag 末批   ... '
    if push_try "$URL" "${batch[@]}"; then echo "OK"; else echo "失败"; FAILED=1; fi
  fi

  printf '   main       ... '
  if push_try "$URL" 'refs/heads/main:refs/heads/main'; then echo "OK"; else echo "失败"; FAILED=1; fi
done

echo
echo "== 远端核对 =="
for repo in "${TARGETS[@]}"; do
  URL="git@github.com:${OWNER}/${repo}.git"
  remote=$(git ls-remote "$URL" 2>/dev/null)
  local_main=$(git rev-parse refs/heads/main)
  remote_main=$(printf '%s\n' "$remote" | awk '$2=="refs/heads/main"{print $1}')
  printf '   %-14s 引用 %-3s  main %s %s\n' \
    "$repo" \
    "$(printf '%s\n' "$remote" | grep -c 'refs/')" \
    "${remote_main:0:7}" \
    "$([ "$local_main" = "$remote_main" ] && echo '✓ 一致' || echo '✗ 不一致')"
done

exit "$FAILED"
