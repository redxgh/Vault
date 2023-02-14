import "animate.css";
import AdminCard from "./AdminCard.js";
import "../style/CardsStyle.css";
import * as React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AdminCards({ sites, Str, update }) {
  if (sites.length > 0) {
    return (
      <div className="card-Container">
        <motion.ul
          className="container-ul"
          variants={container}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
        >
          {sites
            .filter((site) => {
              return (
                site.descr.toLowerCase().includes(Str.toLowerCase()) ||
                site.title.toLowerCase().includes(Str.toLowerCase())
              );
            })
            .map((site) => (
              <motion.li className="item" variants={item} key={site.id}>
                <AdminCard site={site} update={update}></AdminCard>
              </motion.li>
            ))}
        </motion.ul>
      </div>
    );
  } else {
    return <div className="card-container">no sites found</div>;
  }
}

export default AdminCards;
