"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  formatPrice,
  groups,
  products,
  productsIn,
  type CategoryId,
  type Product,
} from "@/lib/menu";

export default function CafeMenu() {
  const [groupId, setGroupId] = useState<CategoryId | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const groupIndex = groups.findIndex((item) => item.id === groupId);
  const group = groupIndex >= 0 ? groups[groupIndex] : null;
  const searching = query.trim().length > 0;
  const previousGroup = groupIndex > 0 ? groups[groupIndex - 1] : null;
  const nextGroup = groupIndex >= 0 && groupIndex < groups.length - 1 ? groups[groupIndex + 1] : null;

  useEffect(() => {
    const hour = new Date().getHours();
    setIsOpen(hour >= 7 && hour < 23);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const visible = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("tr");
    const source = groupId ? productsIn(groupId) : products;
    if (!term) return groupId ? source : [];
    return source.filter(
      (product) =>
        product.name.toLocaleLowerCase("tr").includes(term) ||
        product.description.toLocaleLowerCase("tr").includes(term),
    );
  }, [groupId, query]);

  function openGroup(id: CategoryId) {
    setQuery("");
    setGroupId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setQuery("");
    setGroupId(null);
    setActive(null);
  }

  function stepGroup(delta: number) {
    const nextIndex = groupIndex + delta;
    if (nextIndex < 0) {
      goHome();
      return;
    }
    if (nextIndex >= groups.length) return;
    openGroup(groups[nextIndex].id);
  }

  function stepProduct(delta: number) {
    if (!active) return;
    const index = visible.findIndex((product) => product.id === active.id);
    const next = visible[index + delta];
    if (next) setActive(next);
  }

  const showGroups = !group && !searching;
  const showProducts = Boolean(group) || searching;

  return (
    <div className="phone">
      <header className="bar">
        {group ? (
          <button type="button" className="back" onClick={goHome}>
            Menüler
          </button>
        ) : (
          <div className="brand">
            <span className="ring" aria-hidden="true" />
            <strong>Simitçi Dünyası</strong>
          </div>
        )}
        <p className={`status ${isOpen ? "open" : ""}`}>
          <span className="dot" />
          {isOpen === null ? "07–23" : isOpen ? "Açık" : "Kapalı"}
        </p>
      </header>

      <main className="stage">
        <div className="intro">
          <p className="kicker">{searching ? "Arama" : group ? "Grup" : "Menü"}</p>
          <h1>
            {searching && !group ? "Sonuçlar" : group ? group.label : "Ne bakmak istersin?"}
          </h1>
        </div>
        <label className="search">
          <span className="sr">Ürün ara</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={group ? "Bu grupta ara" : "Ürün ara"}
            type="search"
          />
        </label>

        {showGroups ? (
          <section>
            <ul className="grid">
              {groups.map((item) => {
                const cover = productsIn(item.id)[0];
                const count = productsIn(item.id).length;
                return (
                  <li key={item.id}>
                    <button type="button" className="tile" onClick={() => openGroup(item.id)}>
                      <span className="tile-photo">
                        {cover ? (
                          <Image src={cover.image} alt="" fill sizes="50vw" />
                        ) : null}
                      </span>
                      <span className="tile-copy">
                        <strong>{item.label}</strong>
                        <small>
                          {count} ürün · {item.hint}
                        </small>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {showProducts ? (
          <section>
            {visible.length === 0 ? (
              <p className="empty">Bu aramaya uygun ürün yok.</p>
            ) : (
              <ul className="grid" key={`${groupId ?? "all"}-${query}`}>
                {visible.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      className="card"
                      onClick={() => setActive(product)}
                    >
                      <span className="photo">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="50vw"
                        />
                      </span>
                      <span className="card-copy">
                        <strong>{product.name}</strong>
                        <em>{formatPrice(product.price)}</em>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <p className="note">Örnek fiyatlar · Her gün 07:00 – 23:00</p>
      </main>

      {group ? (
        <nav className="pager" aria-label="Menü gezintisi">
          <button type="button" onClick={() => stepGroup(-1)}>
            <span>Geri</span>
            <small>{previousGroup ? previousGroup.label : "Menüler"}</small>
          </button>
          <p>
            {groupIndex + 1} / {groups.length}
          </p>
          <button type="button" onClick={() => stepGroup(1)} disabled={!nextGroup}>
            <span>İleri</span>
            <small>{nextGroup ? nextGroup.label : "Son menü"}</small>
          </button>
        </nav>
      ) : null}

      {active ? (
        <div className="overlay" onClick={() => setActive(null)}>
          <article
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sheet-photo">
              <Image src={active.image} alt="" fill sizes="430px" />
            </div>
            <div className="sheet-body">
              <p className="kicker">{labelFor(active.category)}</p>
              <h2 id="product-title">{active.name}</h2>
              <p>{active.description}</p>
              <p className="price">{formatPrice(active.price)}</p>
              <div className="sheet-nav">
                <button
                  type="button"
                  onClick={() => stepProduct(-1)}
                  disabled={visible.findIndex((product) => product.id === active.id) <= 0}
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={() => stepProduct(1)}
                  disabled={
                    visible.findIndex((product) => product.id === active.id) >= visible.length - 1
                  }
                >
                  İleri
                </button>
              </div>
            </div>
            <button type="button" className="close" onClick={() => setActive(null)}>
              Kapat
            </button>
          </article>
        </div>
      ) : null}
    </div>
  );
}

function labelFor(category: CategoryId) {
  return groups.find((item) => item.id === category)?.label ?? category;
}
