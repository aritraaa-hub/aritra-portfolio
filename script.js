/* Aritra Tarafder portfolio.
   1) Everything personal is in CONTENT below: change words, links and photos here.
   2) Goo button: Venom Button by exteestudio (MIT licence), see collab/LICENSE. */

const CONTENT = {
  name: "Aritra Tarafder",
  nameCard: "Aritra\nTarafder",                       // \n = second line on the ID card
  role: "Video Editor · Designer · Developer",
  cardCode: "ID · 2026 · AT-01",
  strapText: "CREATIVE • ARITRA TARAFDER • ",
  tagline: "I shape attention through pacing, motion and composition.",
  aboutTitle: "I build edits around attention.",
  about: [
    "I’m Aritra, currently studying at World University of Bangladesh. I’m a passionate video editor and graphic designer.",
    "I also love making unique tech-related work, so my projects sit where story, design and code meet.",
  ],
  strengths: ["Visual direction", "Storytelling", "Pacing"],
  skills: ["Pacing", "Color", "Sound design", "Motion", "Branding", "Web development"],
  tools: ["Pr", "Ae", "Ps", "Ai", "Figma", "VS Code"],
  steps: [
    { t: "Hook", d: "The first seconds decide if anyone stays." },
    { t: "Story & pacing", d: "Shape the cut so every beat earns the next." },
    { t: "Motion & sound", d: "Graphics, rhythm and sound that carry the feeling." },
    { t: "Polish & deliver", d: "Colour, final checks and the right export." },
  ],
  photos: { front: "assets/me-front.webp", side: "assets/me-side.webp", mask: "assets/me-mask.webp" },
  // newest first. "id" is the part after youtu.be/ or /shorts/ (without ?feature=share)
  longVideos: [
    { title: "Podcast Edit", id: "knMX2v8NyCk" },
    { title: "Cafe Marketing", id: "KTfpMxX8Cns" },
    { title: "Social Media Marketing Video edit", id: "bbNV1BAimMc" },
  ],
  shorts: [
    { title: "Product Marketing", id: "HiTdDNFZA5U" },
    { title: "Restaurant Marketing", id: "SBgpTC3lwSk" },
    { title: "Perfume Marketing", id: "2E82cI5Em0c" },
    { title: "Football Turf Marketing", id: "9strluaro1s" },
    { title: "Documentary Edit", id: "JWiuHfd4iiw" },
    { title: "Ed tech Marketing", id: "W7i8Z-faQRo" },
    { title: "Social Media Marketing", id: "4TZ-JO1hc6M" },
  ],
  email: "aritratheking65@gmail.com",
  whatsapp: "+8801639065647",
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/aritraaaaaa/" },
    { name: "Facebook", url: "https://www.facebook.com/aritravaiya" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aritra-tarafder-265466440/" },
    { name: "GitHub", url: "https://github.com/aritraaa-hub" },
    { name: "Behance", url: "https://www.behance.net/alphagaming40" },
  ],
  collabLabel: "let’s collab",
};

(() => {
  "use strict";
  const C = CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ===== Fill the page with CONTENT ===== */
  $("#navName").textContent = C.name;
  $("#heroName").innerHTML = C.name.split(" ").join("<br>");
  $("#heroTag").textContent = C.tagline;
  $("#tools").innerHTML = C.tools.map((t) => `<li>${t}</li>`).join("");
  const stripItems = C.skills.map((s) => `<span>${s}</span>`).join("");
  const track = $("#strip");
  track.innerHTML = stripItems + stripItems;   // twice, so the loop never shows a gap
  track.style.paddingRight = "48px";
  $("#steps").innerHTML = C.steps.map((s, i) => `<li><b>0${i + 1}</b><h4>${s.t}</h4><p>${s.d}</p></li>`).join("");
  $("#aboutTitle").textContent = C.aboutTitle;
  $("#aboutBody").innerHTML = C.about.map((p) => `<p>${p}</p>`).join("");
  $("#strengths").innerHTML = C.strengths.map((s) => `<li>${s}</li>`).join("");
  $("#footName").textContent = `© ${new Date().getFullYear()} ${C.name}`;

  /* ===== Contact ===== */
  const emailEl = $("#emailLink");
  emailEl.textContent = C.email; emailEl.href = "mailto:" + C.email;
  const waEl = $("#waLink");
  waEl.textContent = C.whatsapp; waEl.href = "https://wa.me/" + C.whatsapp.replace(/\D/g, "");
  $("#copyEmail").addEventListener("click", async (e) => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText(C.email); }
    catch (_) { const t = document.createElement("textarea"); t.value = C.email; document.body.append(t); t.select(); try { document.execCommand("copy"); } catch (_) {} t.remove(); }
    b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = "Copy"), 1500);
  });
  $("#socials").innerHTML = C.socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.name}<span aria-hidden="true">↗</span></a></li>`).join("");

  /* ===== Video rails: thumbnail first, the player loads only when clicked ===== */
  function buildRail(id, list) {
    const rail = $("#" + id);
    list.forEach((v) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "vid"; b.setAttribute("aria-label", "Play: " + v.title);
      const img = new Image();
      img.alt = ""; img.loading = "lazy"; img.decoding = "async";
      img.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
      const play = document.createElement("span"); play.className = "vid__play"; play.textContent = "▶";
      const t = document.createElement("div"); t.className = "vid__t"; t.textContent = v.title;
      b.append(img, play, t);
      b.addEventListener("click", () => {
        const f = document.createElement("iframe");
        f.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`;
        f.title = v.title; f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true;
        f.referrerPolicy = "strict-origin-when-cross-origin";
        b.replaceChildren(f);
      }, { once: true });
      rail.append(b);
    });
  }
  buildRail("railLong", C.longVideos);
  buildRail("railShort", C.shorts);
  $$(".arrow").forEach((a) => a.addEventListener("click", () => {
    const r = $("#" + a.dataset.rail);
    r.scrollBy({ left: Number(a.dataset.dir) * r.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
  }));

  /* ===== Scroll: progress line, hiding nav, process timeline ===== */
  const nav = $("#nav"), progress = $("#progress"), tl = $("#timeline"), tilt = tl.firstElementChild;
  const playhead = $("#playhead"), stepEls = $$("#steps li");
  let lastY = scrollY, ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    progress.style.setProperty("--p", max > 0 ? y / max : 0);
    if (y > 120 && y > lastY + 4) nav.classList.add("hide");
    else if (y < lastY - 4 || y <= 120) nav.classList.remove("hide");
    lastY = y;
    const r = tl.getBoundingClientRect();
    const t = clamp(1 - (r.top - vh * 0.3) / (vh * 0.55), 0, 1);       // 0 = tilted, 1 = flat
    tilt.style.setProperty("--tilt", (reduceMotion ? 0 : 38 * (1 - t)) + "deg");
    playhead.style.setProperty("--ph", 4 + 88 * t + "%");
    const idx = t < 0.06 ? -1 : Math.min(3, Math.floor(t * 4));
    stepEls.forEach((li, i) => li.classList.toggle("on", i <= idx));
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ===== Cursor follower: dot, trailing ring, trailing halo ===== */
  (() => {
    if (!finePointer || reduceMotion) return;
    const root = $("#cursor"), dot = $(".cursor__dot"), ring = $(".cursor__ring"), halo = $(".cursor__halo");
    let x = -100, y = -100, rx = x, ry = y, hx = x, hy = y, seen = false;
    addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; rx = hx = x; ry = hy = y; }
      const t = e.target, el = t.closest ? t : t.parentElement;
      root.classList.toggle("hover", !!el.closest("a, button, .vid, .card, [data-hover]"));
      const hide = !!el.closest(".frame") || document.documentElement.classList.contains("goo-engaged");
      root.classList.toggle("on", !hide);
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => root.classList.remove("on"));
    (function loop() {
      rx = lerp(rx, x, 0.2); ry = lerp(ry, y, 0.2); hx = lerp(hx, x, 0.12); hy = lerp(hy, y, 0.12);
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      halo.style.transform = `translate3d(${hx}px,${hy}px,0)`;
      requestAnimationFrame(loop);
    })();
  })();

  /* ===== Batman mask reveal: a round lens that follows the cursor ===== */
  (() => {
    const frame = $("#frame"), mask = $("#mask"), ring = $("#ring");
    $("#imgNormal").src = C.photos.side;
    $("#imgMasked").src = C.photos.mask;
    const HOVER_R = 0.20, PRESS_R = 0.32, EASE = reduceMotion ? 1 : 0.18;
    let W = frame.clientWidth;
    const cur = { x: W / 2, y: W / 2, r: 0 }, tgt = { x: W / 2, y: W / 2, r: 0 };
    let inside = false, pressed = false, raf = 0;
    const radius = () => (pressed ? PRESS_R : HOVER_R) * W;
    function draw() {
      cur.x = lerp(cur.x, tgt.x, EASE); cur.y = lerp(cur.y, tgt.y, EASE); cur.r = lerp(cur.r, tgt.r, EASE);
      if (Math.abs(cur.r - tgt.r) < 0.15) cur.r = tgt.r;
      mask.style.setProperty("--mx", cur.x + "px"); mask.style.setProperty("--my", cur.y + "px"); mask.style.setProperty("--r", cur.r + "px");
      ring.style.width = ring.style.height = cur.r * 2 + "px";
      ring.style.transform = `translate3d(${cur.x - cur.r}px, ${cur.y - cur.r}px, 0)`;
      ring.style.opacity = cur.r > 1 ? "1" : "0";
      const moving = Math.abs(cur.x - tgt.x) > 0.2 || Math.abs(cur.y - tgt.y) > 0.2 || cur.r !== tgt.r;
      raf = moving ? requestAnimationFrame(draw) : 0;
    }
    const wake = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const aim = (e) => { const b = frame.getBoundingClientRect(); tgt.x = e.clientX - b.left; tgt.y = e.clientY - b.top; };
    frame.addEventListener("pointerenter", (e) => { inside = true; aim(e); if (cur.r < 1) { cur.x = tgt.x; cur.y = tgt.y; } tgt.r = radius(); wake(); });
    frame.addEventListener("pointermove", (e) => { if (!inside && e.pointerType === "mouse") return; aim(e); tgt.r = radius(); wake(); });
    frame.addEventListener("pointerdown", (e) => {
      inside = true; pressed = true; aim(e); if (cur.r < 1) { cur.x = tgt.x; cur.y = tgt.y; }
      try { frame.setPointerCapture(e.pointerId); } catch (_) {}
      tgt.r = radius(); wake();
    });
    const up = (e) => { pressed = false; if (e.pointerType !== "mouse") { inside = false; tgt.r = 0; } else tgt.r = radius(); wake(); };
    frame.addEventListener("pointerup", up);
    frame.addEventListener("pointercancel", up);
    frame.addEventListener("pointerleave", () => { if (pressed) return; inside = false; tgt.r = 0; wake(); });
    new ResizeObserver(() => {
      const nw = frame.clientWidth, k = nw / W; W = nw;
      cur.x *= k; cur.y *= k; tgt.x *= k; tgt.y *= k; cur.r *= k; tgt.r = inside ? radius() : 0; wake();
    }).observe(frame);
  })();

  /* ===== Hanging ID card: a rope of points (Verlet physics) ===== */
  const startCard = (() => {
    const CONFIG = { anchorX: () => (innerWidth > 900 ? 0.78 : 0.72) };   // where the strap hangs: 0 = left edge, 1 = right edge
    const SEGMENTS = 12, GRAVITY = 0.55, DAMPING = 0.982, MAX_SPEED = 16, CLIP_GAP = 16;
    $("#cardName").textContent = C.nameCard;
    $("#cardRole").textContent = C.role;
    $("#cardCode").textContent = C.cardCode;
    $("#cardPhoto").src = C.photos.front;
    $("#strapText").textContent = C.strapText.repeat(8);

    const stage = $("#stage"), card = $("#card"), inner = $(".card__inner"), holo = $(".card__holo"), strap = $("#strapPath"), hint = $("#hint");
    let W, H, anchor, segLen, pts = [], cons = [], drag = null, hasDragged = false, settled = 0;
    let raf = 0, quiet = 0, frames = 0, visible = true, started = false;

    function build() {
      W = card.offsetWidth; H = card.offsetHeight;
      const sh = stage.clientHeight;
      const restTop = Math.max(110, (sh - H) / 2 - 20);
      const ropeLen = Math.max(60, restTop - CLIP_GAP + 20);
      anchor = { x: stage.clientWidth * CONFIG.anchorX(), y: -20 };
      segLen = ropeLen / SEGMENTS;
      pts = []; cons = [];
      const lift = reduceMotion ? 0 : ropeLen + H + 60, sway = reduceMotion ? 0 : 90;   // start above the screen so it drops in
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS, x = anchor.x + sway * t, y = anchor.y + i * segLen - lift * t;
        pts.push({ x, y, px: x, py: y, w: i === 0 ? 0 : 1 });
      }
      const clip = pts[SEGMENTS], top = clip.y + CLIP_GAP, cx = clip.x + (reduceMotion ? 0 : 30);
      [[cx - W / 2, top], [cx + W / 2, top], [cx + W / 2, top + H], [cx - W / 2, top + H]].forEach(([x, y]) => pts.push({ x, y, px: x, py: y, w: 0.35 }));
      const [TL, TR, BR, BL] = [SEGMENTS + 1, SEGMENTS + 2, SEGMENTS + 3, SEGMENTS + 4];
      for (let i = 0; i < SEGMENTS; i++) cons.push({ a: i, b: i + 1, len: segLen, stretchOnly: true });   // strap never stretches, may go slack
      const d = Math.hypot(W / 2, CLIP_GAP), diag = Math.hypot(W, H);
      cons.push({ a: SEGMENTS, b: TL, len: d }, { a: SEGMENTS, b: TR, len: d },
        { a: TL, b: TR, len: W }, { a: TR, b: BR, len: H }, { a: BR, b: BL, len: W }, { a: BL, b: TL, len: H },
        { a: TL, b: BR, len: diag }, { a: TR, b: BL, len: diag });
      card.classList.add("ready");
      frames = 0; wake();
    }
    const corners = () => pts.slice(SEGMENTS + 1, SEGMENTS + 5);
    function solve() {
      for (const c of cons) {
        const A = pts[c.a], B = pts[c.b], dx = B.x - A.x, dy = B.y - A.y, dist = Math.hypot(dx, dy) || 0.0001;
        if (c.stretchOnly && dist <= c.len) continue;
        const diff = (dist - c.len) / dist, wsum = A.w + B.w;
        if (!wsum) continue;
        A.x += dx * diff * (A.w / wsum); A.y += dy * diff * (A.w / wsum);
        B.x -= dx * diff * (B.w / wsum); B.y -= dy * diff * (B.w / wsum);
      }
    }
    function bilinear(u, v) {
      const [a, b, c, d] = corners();
      return {
        x: (1 - u) * (1 - v) * a.x + u * (1 - v) * b.x + u * v * c.x + (1 - u) * v * d.x,
        y: (1 - u) * (1 - v) * a.y + u * (1 - v) * b.y + u * v * c.y + (1 - u) * v * d.y,
        w: [(1 - u) * (1 - v), u * (1 - v), u * v, (1 - u) * v],
      };
    }
    function step() {
      for (const p of pts) {
        if (!p.w) continue;
        const vx = clamp((p.x - p.px) * DAMPING, -MAX_SPEED, MAX_SPEED), vy = clamp((p.y - p.py) * DAMPING, -MAX_SPEED, MAX_SPEED);
        p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + GRAVITY;
      }
      if (drag) {
        const g = bilinear(drag.u, drag.v), dx = drag.x - g.x, dy = drag.y - g.y;
        corners().forEach((p, i) => { const k = g.w[i] * 1.6; p.x += dx * k; p.y += dy * k; p.px = lerp(p.px, p.x, 0.25); p.py = lerp(p.py, p.y, 0.25); });
      }
      for (let i = 0; i < 14; i++) solve();
    }
    function render() {
      const [TL, TR, BR, BL] = corners();
      const ax = (TR.x - TL.x) / W, ay = (TR.y - TL.y) / W, bx = (BL.x - TL.x) / H, by = (BL.y - TL.y) / H;
      card.style.transform = `matrix(${ax},${ay},${bx},${by},${TL.x},${TL.y})`;
      const cxv = (TL.x - TL.px + TR.x - TR.px) / 2, cyv = (TL.y - TL.py + BL.y - BL.py) / 2;
      const ry = clamp(cxv * 2.2, -40, 40), rx = clamp(-cyv * 1.2, -25, 25);
      inner.style.transform = `perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg)`;
      holo.style.setProperty("--gx", `${50 + ry * 1.5 + Math.atan2(ay, ax) * 60}%`);
      holo.style.setProperty("--gy", `${50 + rx * 1.5}%`);
      let d = `M ${pts[0].x} ${pts[0].y - 40} L ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < SEGMENTS; i++) d += ` Q ${pts[i].x} ${pts[i].y} ${(pts[i].x + pts[i + 1].x) / 2} ${(pts[i].y + pts[i + 1].y) / 2}`;
      strap.setAttribute("d", d + ` L ${pts[SEGMENTS].x} ${pts[SEGMENTS].y + 6}`);
      if (!hasDragged) {
        hint.style.left = `${(BR.x + BL.x) / 2}px`; hint.style.top = `${Math.max(BR.y, BL.y) + 22}px`;
        settled = Math.abs(cxv) + Math.abs(cyv) < 0.6 ? settled + 1 : 0;
        hint.classList.toggle("show", settled > 30);
      }
    }
    // the loop stops when the card is at rest or off screen, and wakes up on drag, resize or scroll back
    function loop() {
      raf = 0; step(); render(); frames++;
      let e = 0; for (const p of pts) e += Math.abs(p.x - p.px) + Math.abs(p.y - p.py);
      quiet = !drag && frames > 90 && e < 0.6 ? quiet + 1 : 0;
      if (quiet < 90 && visible) raf = requestAnimationFrame(loop);
    }
    function wake() { quiet = 0; if (!raf && visible && started && pts.length) raf = requestAnimationFrame(loop); }
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) wake(); }).observe(stage);

    const local = (e) => { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    card.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const p = local(e), [TL, TR, , BL] = corners();
      const ux = TR.x - TL.x, uy = TR.y - TL.y, vx = BL.x - TL.x, vy = BL.y - TL.y, rx = p.x - TL.x, ry = p.y - TL.y;
      drag = { u: clamp((rx * ux + ry * uy) / (W * W), 0, 1), v: clamp((rx * vx + ry * vy) / (H * H), 0, 1), ...p };
      card.classList.add("dragging"); card.setPointerCapture(e.pointerId);
      if (!hasDragged) { hasDragged = true; hint.classList.remove("show"); }
      wake();
    });
    card.addEventListener("pointermove", (e) => { if (drag) Object.assign(drag, local(e)); });
    const release = () => { drag = null; card.classList.remove("dragging"); pts.forEach((p) => { p.px = lerp(p.px, p.x, 0.6); p.py = lerp(p.py, p.y, 0.6); }); wake(); };
    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
    addEventListener("resize", () => {
      if (!anchor || !pts.length) return;
      const nx = stage.clientWidth * CONFIG.anchorX(), dx = nx - anchor.x;
      pts.forEach((p) => { p.x += dx; p.px += dx; }); anchor.x = nx; pts[0].x = pts[0].px = nx; wake();
    });
    return () => { started = true; build(); render(); };   // called once the loader has finished
  })();

  /* ===== Loader: a timecode counts up, then the card drops in ===== */
  (() => {
    const loader = $("#loader"), tc = $("#tc"), pad = (n) => String(n).padStart(2, "0");
    const finish = () => { loader.classList.add("done"); document.body.classList.add("loaded"); startCard(); };
    if (reduceMotion) return finish();
    const t0 = performance.now(), DURATION = 800;
    (function tick(now) {
      const ms = Math.min(now - t0, DURATION);
      tc.textContent = `00:00:${pad(Math.floor(ms / 1000))}:${pad(Math.floor(((ms % 1000) / 1000) * 24))}`;
      if (now - t0 < DURATION) requestAnimationFrame(tick); else finish();
    })(t0);
  })();

  /* ===== 3D "let's collab" goo button (Venom Button by exteestudio, MIT) =====
     A glossy CSS pill shows first. About 3.5 s later the 3D button loads inside a transparent frame,
     but only on a fast computer with a mouse. Phones and slow computers keep the pill. */
  (() => {
    const FRAME_SRC = "collab/venom.html", DELAY = 3500, SLOW_KEY = "aritra-goo-slow";
    const link = $("#collab");
    link.querySelector(".label").textContent = C.collabLabel;
    const force = /[?&]goo=force/.test(location.search);   // add ?goo=force to the address to test again after a "slow" result
    const touch = matchMedia("(hover: none), (pointer: coarse)").matches;
    let slow = false;
    try { slow = !force && localStorage.getItem(SLOW_KEY) === "1"; } catch (_) {}
    if (reduceMotion || touch || slow) return;

    let frame = null, layout = null, ready = false, alive = false;
    function place() {   // put the real link exactly over the 3D pill
      if (!frame || !layout) return;
      const r = frame.getBoundingClientRect();
      link.style.cssText = `left:${r.left + layout.cx - layout.hw}px;top:${r.top + layout.cy - layout.hh}px;width:${layout.hw * 2}px;height:${layout.hh * 2}px;bottom:auto;transform:none`;
    }
    function drop(remember) {
      if (frame) frame.remove();
      frame = null; alive = false;
      if (remember) { try { localStorage.setItem(SLOW_KEY, "1"); } catch (_) {} }
    }
    function go() {
      alive = true;
      frame.classList.add("show"); link.classList.add("is-3d"); place();
      const post = (m) => { if (frame) frame.contentWindow.postMessage(m, "*"); };
      const send = (t, e) => { const r = frame.getBoundingClientRect(); post({ venom: "ptr", t, x: e.clientX - r.left, y: e.clientY - r.top, pt: e.pointerType || "mouse" }); };
      addEventListener("pointermove", (e) => frame && send("move", e), { passive: true });
      addEventListener("pointerdown", (e) => frame && send("down", e), { passive: true });
      addEventListener("pointerup", (e) => frame && send("up", e), { passive: true });
      document.documentElement.addEventListener("pointerleave", () => post({ venom: "ptr", t: "leave" }));
    }
    function measure() {   // after a short warm-up, time 20 frames; slow computers go back to the pill
      setTimeout(() => {
        if (!frame) return;
        const gaps = []; let last = performance.now();
        requestAnimationFrame(function tick(now) {
          gaps.push(now - last); last = now;
          if (gaps.length < 20) return requestAnimationFrame(tick);
          gaps.sort((a, b) => a - b);
          if (gaps[gaps.length >> 1] > 22) drop(true); else go();   // 22 ms per frame = below about 45 fps
        });
      }, 1200);
    }
    addEventListener("message", (e) => {
      if (!frame || e.source !== frame.contentWindow) return;
      const d = e.data;
      if (!d || !d.venom) return;
      if (d.venom === "layout") { layout = d; if (alive) place(); }
      else if (d.venom === "ready") { ready = true; measure(); }
      else if (d.venom === "engaged") document.documentElement.classList.toggle("goo-engaged", !!d.on);
    });
    addEventListener("resize", place);
    function start() {
      frame = document.createElement("iframe");
      frame.className = "collab-frame";
      frame.src = FRAME_SRC + "?label=" + encodeURIComponent(C.collabLabel);
      frame.title = "3D button"; frame.setAttribute("aria-hidden", "true"); frame.tabIndex = -1;
      document.body.appendChild(frame);
      setTimeout(() => { if (!ready) drop(false); }, 8000);   // file missing or blocked: keep the pill
    }
    setTimeout(() => ("requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2000 }) : start()), DELAY);
  })();
})();
