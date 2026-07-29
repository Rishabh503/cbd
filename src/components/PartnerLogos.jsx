"use client";

const partnerBrands = [
  { name: "Dolfy Learning", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1722239365/dolfy_okslvf.png" },
  { name: "AWS Student Builder Group", logoUrl: "/aws.png" },
  { name: "Uno Minda", logoUrl: "https://res.cloudinary.com/djhilzrxt/image/upload/f_auto,q_auto,w_250/v1722794702/Uno_eo5gl6.jpg" },
  { name: "Pizza Hut", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1724785424/pizza_hut_yss9fg.png" },
  { name: "Festa Marketing", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1722238954/festa-new_h4sim3.jpg" },
  { name: "IDP", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1722238970/idp-new_iqlzgc.png" },
  { name: "Meta Space", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1722238968/meta_space_xhg8di.png" },
  { name: "Momentum IAS", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1722238965/momentum_ias_ptmdje.png" },
  { name: "Programming Pathshala", logoUrl: "https://res.cloudinary.com/dzvdh7yez/image/upload/f_auto,q_auto,w_250/v1722238948/programming_pathshala_new_cpoipf.jpg" },
  { name: "Zenzia", logoUrl: "https://res.cloudinary.com/djhilzrxt/image/upload/f_auto,q_auto,w_250/v1722794668/Zenzia_tfxldh.jpg" },
  { name: "Krafton India", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317178/social-media-default-screen_afwm4g.jpg" },
  { name: "IEEE Smart Cities", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317178/YTCJwDgo_400x400_gib8gq.jpg" },
  { name: "Kyndryl", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317178/wtn_logo_8_qh7tvv.png" },
  { name: "The Belgian Waffle Co", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317178/the_belgian_waffle_co_logo_gnp6zd.jpg" },
  { name: "Stockedge", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317178/stockedgelogoimage28102022144458_ra0sny.png" },
  { name: "EPYC", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317177/epyc_logo_dzluh8.jpg" },
  { name: "Mother Dairy", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317177/Mother_Dairy.svg_j84cj5.png" },
  { name: "Unidays", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317177/Social-Imagery-47_visg4h.webp" },
  { name: "Cloud Native Community groups", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317177/CNCF_Community_Groups_Logo_2023_PRjuBUd_zvgrko.webp" },
  { name: "MapmyIndia", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317177/images_s3lguz.jpg" },
  { name: "Bistro 57", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756317176/360_F_238159412_HhVnn8jBWgYG9IoRSlPw2Iz5FMZz93CH_sly5np.jpg" },
  { name: "Reskill", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756321734/reskilll_paqslv.png" },
  { name: "Launched Global", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756321570/Screenshot_2025-08-28_at_12.35.41_AM_eqnlbo.png" },
  { name: "Microsoft Azure", logoUrl: "https://res.cloudinary.com/dcvl4olut/image/upload/f_auto,q_auto,w_250/v1756318894/Microsoft-Azure-Logo_vvmcjr.png" },
  { name: "MAIT", logoUrl: "/mait.png" },
  { name: "PVR Cinemas", logoUrl: "/pvr.png" },
  { name: "Mercedes-Benz", logoUrl: "/merc.png" },
  { name: "CSI", logoUrl: "/csilogo.webp" }
];

export default function PartnerLogos() {
  // Double items list to provide infinite loop scrolling (56 items total)
  const marqueeItems = [...partnerBrands, ...partnerBrands];

  return (
    <section className="partner-logos-section">
      <div className="partner-logos-header">
        OUR COLLABORATORS
      </div>
      
      <div className="partner-marquee-container">
        <div className="partner-marquee-track">
          {marqueeItems.map((partner, idx) => (
            <div key={idx} className="sticker-item partner-brand-sticker">
              <img 
                src={partner.logoUrl} 
                alt={`${partner.name} Logo`} 
                className="partner-brand-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
