import "../style/CardStyle.css";
import { useState, useEffect } from "react";
function CardComponent({ site }) {
  const [link, setLink] = useState("");
  useEffect(() => {
    if (
      site.link.substring(0, 8) === "https://" ||
      site.link.substring(0, 7) === "http://"
    ) {
      setLink(site.link);
    } else {
      setLink(`http://${site.link}`);
    }
  }, [setLink, site.link]);
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className="container">
        <img src={"/images/" + site.image} alt="site"></img>
        <h1 className="title">{site.title}</h1>
        <p className="desc">{site.descr}</p>
      </div>
    </a>
  );
}

export default CardComponent;
