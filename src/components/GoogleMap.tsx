import { siteConfig } from "@/data/site-config";

export default function GoogleMap() {
  return (
    <div className="w-full h-80 sm:h-96 bg-gray-100 overflow-hidden">
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.full)}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Salon Phuong location"
      />
    </div>
  );
}
