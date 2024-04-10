import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import CollectioWithProduct from "./CollectioWithProduct";
import CollectionWithMedia from "./CollectionWithMedia";
import FooterFaq from "./FooterFaq";

/**
 * render section dynamiclly based on
 * section.type
 */
const sections = {
  banner: Banner,
  collectionWithMedia: CollectionWithMedia,
  collection: CollectioWithProduct,
  faq: FooterFaq,
};

const SubscriptionCollection = () => {
  const [collectionSections, setCollectionSections] = useState({});

  useEffect(() => {
    try {
      const sectionData = JSON.parse(
        window["subscription-collection-template"].innerHTML
      );
      setCollectionSections(sectionData.JSON);
    } catch ({ message }) {
      console.log(message);
    }
  }, []);

  if (!Object.keys(collectionSections).length) return null;

  return (
    <div className="subscription-collection">
      {collectionSections.map((section) => {
        const Component = sections[section.type];
        return <Component {...section} />;
      })}
    </div>
  );
};

export default SubscriptionCollection;
