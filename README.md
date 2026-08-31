# Ji-Hyun Lee — Personal Research Website


## 구성

```
index.html        index.ko.html        소개 / About
research.html     research.ko.html     연구 / Research
publications.html publications.ko.html 논문 / Publications
artwork.html      artwork.ko.html      아트워크 / Artwork
news.html         news.ko.html         소식 / News
cv.html           cv.ko.html           CV
style.css                              전체 스타일 (단일 파일)
main.js                                연도 표시 + 방문자 카운터
assets/                                프로필 사진, 연구 이미지, 아트워크
.nojekyll                              GitHub Pages의 Jekyll 처리 비활성화
```

영문 페이지가 기본(`index.html`), 한국어 페이지는 `.ko.html` 입니다.
우측 상단의 `EN` / `KO` 버튼으로 서로 전환됩니다.

## 배포 (GitHub Pages)

기존 `jihyun1208/home` 저장소를 그대로 쓰는 경우:

```bash
cd website
git init
git remote add origin https://github.com/jihyun1208/home.git
git add -A
git commit -m "Redesign personal research website"
git branch -M main
git push -u origin main --force
```

푸시 후 저장소 **Settings → Pages** 에서 Source 를 `main` 브랜치 `/ (root)` 로 두면
`https://jihyun1208.github.io/home/` 에 반영됩니다.

`jihyun1208.github.io` (루트 도메인)로 쓰고 싶다면 저장소 이름을
`jihyun1208.github.io` 로 새로 만들어 같은 내용을 푸시하세요.

## 수정 방법

- **프로필 사진**: 사진을 `assets/profile.jpg` 로 넣고, `index.html` / `index.ko.html` 의
  `src="assets/profile.svg"` 를 `src="assets/profile.jpg"` 로 바꾸세요. (정사각형 이미지 권장)
- **논문 추가**: `publications*.html` 안의 주석(`<!-- 예시 ... -->`)을 풀고 내용을 교체하세요.
  `badge-link` / `badge-oral` / `badge-choice` / `badge-featured` / `badge-award` 배지를 쓸 수 있습니다.
- **소식 추가**: `news*.html` 의 `.news-item` 블록을 복사해 맨 위에 추가하세요.
- **아트워크 추가**: 이미지를 `assets/` 에 넣고 `artwork*.html` 의 `<figure>` 블록을 복사하세요.
- **색상 변경**: `style.css` 상단 `:root` 의 `--accent` 값을 바꾸면 전체 강조색이 바뀝니다.
- **CV PDF**: `cv*.html` 첫 문단의 `<a href="#">PDF</a>` 를 실제 파일 링크로 바꾸세요.
- **방문자 카운터 제거**: `main.js` 의 counter 블록과 각 페이지 footer 의
  `<p class="visit-count">…</p>` 줄을 지우면 됩니다. (외부 서비스 abacus.jasoncameron.dev 사용)

## 로컬 미리보기

```bash
python3 -m http.server 4321 --directory website
```

브라우저에서 `http://localhost:4321/index.ko.html` 을 엽니다.
