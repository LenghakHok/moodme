export function Favicon() {
  return (
    <>
      <link
        href="/svg/logo-dark.svg"
        media="(prefers-color-scheme: dark)"
        rel="icon"
        type="image/svg+xml"
      />
      <link
        href="/svg/logo-light.svg"
        media="(prefers-color-scheme: light)"
        rel="icon"
        type="image/svg+xml"
      />
    </>
  );
}
