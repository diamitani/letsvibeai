export function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-navy shadow-lift">
      <video
        className="aspect-video w-full bg-navy-900"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        title={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not play this video.
      </video>
    </div>
  );
}
