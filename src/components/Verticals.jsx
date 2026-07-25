"use client";

export default function Verticals() {
  return (
    <section className="verticals-section" id="verticals">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Our Verticals</div>
          <h2>Connect. Buzz. Disrupt.</h2>
          <p>Every campaign we run operates within one cohesive, pop-art inspired growth ecosystem.</p>
        </div>

        <div className="verticals-grid-bento reveal">
          {/* Left Column: Giant Bento Card (Peshwa bird rider) */}
          <div className="bento-main-card">
            <img src="/verticals_main.png" alt="CBD Growth Connection Engine" className="bento-main-img" />
            <div className="bento-overlay">
              <span className="eyebrow">THE CONNECTION CORE</span>
              <h3>Riding The Social Wave</h3>
              <p>
                CBD operates at the heart of community and brand activations, linking creators, campus hubs, and digital marketing strategies into one cohesive traction engine.
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Sub-Grid of Services */}
          <div className="bento-sub-grid">
            {/* Cell 1: Media Campaigns (Megaphone guy) */}
            <div className="bento-cell">
              <img src="/verticals_media.png" alt="Brand Growth & Marketing" className="bento-cell-img" />
              <div className="bento-cell-overlay">
                <h4>Brand Growth &amp; Campaigns</h4>
                <p>Strategic media campaigns, brand positioning, and accelerating conversions.</p>
              </div>
            </div>

            {/* Cell 2: Creator Partnerships (Rock hand icon) */}
            <div className="bento-cell">
              <img src="/verticals_rock.png" alt="Creator Partnerships" className="bento-cell-img" />
              <div className="bento-cell-overlay">
                <h4>Creator Partnerships</h4>
                <p>Authentic creator collaborations, matchmaking, and direct relationship routing.</p>
              </div>
            </div>

            {/* Cell 3: College Collaborations (Laptop girl) */}
            <div className="bento-cell">
              <img src="/verticals_laptop.png" alt="College & Community Collaborations" className="bento-cell-img" />
              <div className="bento-cell-overlay">
                <h4>College &amp; Campus Link</h4>
                <p>Recruiting student ambassadors, campus drives, and local network activations.</p>
              </div>
            </div>

            {/* Cell 4: Website Design & Development (Construction) */}
            <div className="bento-cell">
              <img src="/verticals_construction.png" alt="Website Design & Development" className="bento-cell-img" />
              <div className="bento-cell-overlay">
                <h4>Web Design &amp; Development</h4>
                <p>Building high-converting digital storefronts, interactive platforms, and assets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
