/*=============================================
=         SECONDARY BUTTON COMPONENT             =
=============================================*/
/**
 * Button use in the application
 */

//Libraries
import React from "react";
import Link from "next/link";

//styles
import styles from "./BtnSecondary.module.scss";

//Types
interface BtnSecondaryProps {
  available: boolean;
  handleClick: (event: any) => void;
  label: string;
  link: string | null;
}

/**
 * Button use in the application
 * @param param0 avaible handleClick label link
 * @returns
 */
function BtnSecondary({
  available,
  handleClick,
  label,
  link,
}: BtnSecondaryProps) {

  const openNewTab = link ? link.startsWith('http') : false;
  return (
    <div
      className={[
        styles.global_container,
        available ? styles.available : styles.not_available,
      ].join(" ")}
    >
      {link ? (
        <Link target={openNewTab? '_blank': ''} className={styles.link} href={link}>
          <span
            dangerouslySetInnerHTML={{ __html: label }}
            onClick={(e) => handleClick(e)}
          />
        </Link>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: label }} />
      )}
    </div>
  );
}

export default BtnSecondary;
