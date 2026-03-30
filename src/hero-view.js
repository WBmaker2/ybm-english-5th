export function createHeroMediaView({ selectedCard, drawOrder }) {
  if (!selectedCard) {
    return {
      placeholderHidden: false,
      imageHidden: true,
      imageSrc: "",
      imageAlt: "",
      badgeHidden: true,
      badgeText: ""
    };
  }

  return {
    placeholderHidden: true,
    imageHidden: false,
    imageSrc: selectedCard.src,
    imageAlt: `${selectedCard.title} 크게 보기`,
    badgeHidden: false,
    badgeText: `${drawOrder}번째 카드`
  };
}
