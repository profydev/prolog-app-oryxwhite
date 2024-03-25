import styles from "./hero.module.scss";
import { useGetContent } from "../../api/use-get-content";

export function Hero() {
  const { data } = useGetContent();
  console.log(data);

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heading}>
          <h1>{data?.sections[0].title}</h1>
          <p>{data?.sections[0].subtitle}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.sections[0].image?.src}
          alt="hero image"
          width={data?.sections[0].image?.width}
          height={data?.sections[0].image?.height}
        />
      </div>
      <div className={styles.social}>
        <div className={styles["social-content"]}>
          <p>{data?.sections[1].title}</p>
          <div className={styles["logos-container"]}>
            {data?.sections[1].companies?.map((company) => {
              {
                /* eslint-disable-next-line @next/next/no-img-element */
              }
              return (
                <div className={styles["grid-item"]} key={company.name}>
                  {" "}
                  <img src={company.logo} alt={company.name} />{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.testimonial}>
        <div className={styles.heading}>
          <h2>{data?.sections[2].title}</h2>
          <p>{data?.sections[2].subtitle}</p>
        </div>
        <div className={styles.quotes}>
          {data?.sections[2].testimonials?.map((testimonial, index) => {
            return (
              <div
                className={
                  index % 2 === 0
                    ? styles["quote-primary"]
                    : styles["quote-gray"]
                }
                key={testimonial.title}
              >
                <div className={styles["quote-heading"]}>
                  <h3>{testimonial.title}</h3>
                  <p>{testimonial.text}</p>
                </div>
                <div className={styles["quote-content"]}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${testimonial.userImage.src.slice(0, -3)}png`}
                    alt={testimonial.userName}
                  />
                  <h4>{testimonial.userName}</h4>
                  <h5>
                    {testimonial.userRole}, {testimonial.userCompany}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
