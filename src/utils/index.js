export const supportWebp = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}


export const setImage = (isSupportWebp, baseImg, baseImgWebp, desktopImg, desktopImgWebp) => {
    const obj = {
        base: isSupportWebp ? baseImgWebp : baseImg,
        desktop: isSupportWebp ? desktopImgWebp : desktopImg
    }
    console.log('obj: ', obj);

    return obj
}