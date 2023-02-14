import "../style/AdminCardStyle.css";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { useState, useEffect } from "react";
function AdminCard({ site, update }) {
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
  async function handleDelete(e) {
    let id = await e.currentTarget.id;
    await axios
      .post("/delete", { id: id })
      .then(async (response) => {
        await update();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container">
      <a href={link} target="_blank" rel={"external noreferrer"}>
        <img src={`/images/${site.image}`} alt="site"></img>
        <h1 className="title">{site.title}</h1>
        <p className="desc">{site.descr}</p>
      </a>
      <div className="buttons-cont">
        <button
          id={site.id}
          className="utility-btn del-btn"
          onClick={handleDelete}
        >
          <BsTrash />
        </button>
        {/*<button
          id={site.id}
          className="utility-btn mod-btn"
          onClick={async (e) => {
            handleOpen();
            let id = await e.currentTarget.id;
            localStorage.setItem("currentId", `${id}`);
          }}
        >
          <BsFillPencilFill />
        </button>*/}
      </div>
    </div>
  );
}

export default AdminCard;
