/** Turns a YouTube, Vimeo, or Loom share link into its embed link. */
function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  const loom = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/);
  if (loom) return `https://www.loom.com/embed/${loom[1]}`;
  return url;
}

export default function GapVideo({ url, gap }: { url: string; gap: string }) {
  const title = `Tabitha on the ${gap} Gap`;
  return (
    <figure className="mb-8">
      <div className="relative w-full overflow-hidden rounded-sm border border-taupe bg-charcoal" style={{ aspectRatio: "16 / 9" }}>
        {/\.mp4($|\?)/i.test(url) ? (
          <video src={url} controls preload="metadata" className="absolute inset-0 h-full w-full" title={title} />
        ) : (
          <iframe
            src={toEmbedUrl(url)}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
      <figcaption className="font-body text-sm text-charcoal-light mt-3">
        A short word from Tabitha about the {gap} Gap.
      </figcaption>
    </figure>
  );
}
