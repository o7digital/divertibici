import React from "react";
import Link from "next/link";

const brandBanners = [
  {
    title: "Turbo Bike",
    imgSrc: "/assets/images/home/demo16/banner-1.jpg",
    href: "/#products",
  },
  {
    title: "Divertibici",
    imgSrc: "/assets/images/home/demo16/banner-2.jpg",
    href: "/#products",
  },
];

export default function GridBanner() {
  return (
    <section className="grid-banner container mb-3">
      <div className="row">
        {brandBanners.map((elm, i) => (
          <div key={i} className="col-md-6">
            <div className="grid-banner__item grid-banner__item_rect grid-banner__item_rect_3 position-relative">
              <div
                className="background-img"
                style={{ backgroundImage: `url(${elm.imgSrc})` }}
              ></div>
              <div className="content_abs content_left d-flex flex-column justify-content-center h-100">
                <h3 className="text-uppercase text-white fs-35 fw-bold mb-3">
                  {elm.title}
                </h3>
                <p className="mb-0">
                  <Link
                    href={elm.href}
                    className="btn-link default-underline text-uppercase text-white fw-bold fs-base w-auto"
                  >
                    Ver productos
                  </Link>
                </p>
              </div>
              {/* <!-- /.content_abs content_left d-flex flex-column justify-content-center h-100 --> */}
            </div>
          </div>
        ))}

        {/* <!-- /.col-md-6 --> */}
      </div>
      {/* <!-- /.row --> */}
    </section>
  );
}
