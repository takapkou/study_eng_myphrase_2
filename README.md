# 英語フレーズリファレンス — 04 P/I Series

構文パターン（P01〜P15）とイディオムチャンク（I01〜I15）の学習アプリ。

## 機能

- **構文パターン** タブ — P01〜P15、フレーズカード形式
- **イディオムチャンク** タブ — I01〜I15、チャンクカードグリッド形式
- **★ フォーカスリスト** — ★ボタンでブックマーク → localStorage保存 → 一覧・再生
- 🔍 リアルタイム検索（チャンク・意味・例文を横断）
- 🎙️ 音声再生（Web Speech API）、全再生・ループ・速度調整（0.7〜1.5×）
- 章フィルター（ナビバー＋サイドバー）

## Vercel へのデプロイ手順

### 方法 A: GitHub 経由（推奨）

1. このフォルダを GitHub にプッシュ
```bash
git init
git add .
git commit -m "initial commit"
gh repo create english-ref --public --push
```

2. [vercel.com](https://vercel.com) でリポジトリを選択 → Deploy

### 方法 B: Vercel CLI

```bash
npm i -g vercel
vercel
```

## ローカル開発

```bash
npm install
npm run dev
# → http://localhost:3000
```

## ビルド確認

```bash
npm run build
npm start
```

## フォーカスリストについて

- フレーズカード右上の ★ をクリックで追加／解除
- **★ フォーカスリスト** タブで一覧表示・音声再生
- データは `localStorage`（`eng_focus_list` キー）に保存
- ブラウザをまたいで使う場合は将来的に Vercel KV や Supabase と接続可能

## 技術スタック

- Next.js 14 (App Router)
- Tailwind CSS
- Web Speech API（音声再生）
- localStorage（フォーカスリスト永続化）
