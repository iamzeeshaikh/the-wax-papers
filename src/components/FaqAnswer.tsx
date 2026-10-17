import Link from "next/link";

/** Renders an answer that may contain one authored <a href="/path">anchor</a>. */
export default function FaqAnswer({ text }: { text: string }) {
  const parts = text.split(/(<a href="\/[^"]*">[^<]*<\/a>)/);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^<a href="(\/[^"]*)">([^<]*)<\/a>$/.exec(part);
        return m ? <Link key={i} href={m[1]} className="underline">{m[2]}</Link> : <span key={i}>{part}</span>;
      })}
    </>
  );
}
