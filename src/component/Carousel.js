/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { isEmpty } from '@/plugin/lodash';
import placeholderImg from '@/assets/images/altar/placeholder_img.png';

const Carousel = ({
    NftList,
    selectItem,
    choiseItem,
}) => {
    const [swiper, setSwiper] = useState(null);
    const [swiperIndex, setSwiperIndex] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const UrnLength = NftList.name === 'urn' ? NftList.list.map((item) => item.amount).reduce((a, b) => a + b, 0) : 0;

    const handlePrev = () => {
        swiper.slideTo(0);
        setIsEnd(false);
    };

    const handleNext = () => {
        swiper.slideNext();
        if (swiper.isEnd) {
            setIsEnd(true);
        } else {
            setIsEnd(false);
        }
    };

    return (
        <Flex
            w="100%"
            justifyContent="center"
            alignItems="center"
            position="relative"
            p="0 32px"
        >
            {
                swiperIndex !== 0 && (
                    <IconButton
                        aria-label="Previous"
                        icon={<ChevronLeftIcon />}
                        position="absolute"
                        left="22px"
                        top="50%"
                        transform="translateY(-50%)"
                        bottom={0}
                        zIndex={2}
                        variant="arrow"
                        onClick={handlePrev}
                        w="22px"
                        h="22px"
                        minWidth="22px"
                    />
                )
            }
            <Swiper
                spaceBetween={14}
                onSwiper={(s) => {
                    setSwiper(s);
                }}
                onSlideChange={(e) => {
                    setSwiperIndex(e.realIndex);
                }}
                width={100}
            >
                {(!isEmpty(NftList.list) && NftList.name !== 'urn') && NftList.list.map((item, index) => (
                    <SwiperSlide key={index} style={{ width: '100px !important' }}>
                        <Box position="relative" w="100px" onClick={() => selectItem(item)}>
                            <Image
                                w="100px"
                                h="100px"
                                src={item?.current_token_data?.metadata_uri}
                                alt={item?.current_token_data?.metadata_uri}
                                fallbackSrc={placeholderImg.src}
                                _hover={{
                                    border: '1px solid #FFF3CD',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                }}
                                borderRadius="12px"
                                border={choiseItem.token_data_id_hash === item.token_data_id_hash ? '1px solid #FFF3CD' : 'none'}
                            />
                            <Text
                                position="absolute"
                                top="6px"
                                right="6px"
                                fontSize="12px"
                                color="#FFF3CD"
                                fontWeight="600"
                            >
                                {item?.token_properties?.point ?? ''}
                            </Text>
                        </Box>
                    </SwiperSlide>
                ))}
                {(!isEmpty(NftList.list) && NftList.name === 'urn') && NftList.list.flatMap((item, index) => {
                    let currentIndex = -1;
                    return Array.from({ length: item.amount }).map((_, i) => {
                        currentIndex++;
                        const choiseIndex = `${index}-${currentIndex}`;
                        return (
                            <SwiperSlide key={`${index}-${i}`} style={{ width: '100px !important' }}>
                                <Box position="relative" w="100px" onClick={() => selectItem({ ...item, choiseIndex })}>
                                    <Image
                                        w="100px"
                                        h="100px"
                                        src={item.current_token_data?.metadata_uri}
                                        alt={item.current_token_data?.metadata_uri}
                                        fallbackSrc={placeholderImg.src}
                                        _hover={{
                                            border: '1px solid #FFF3CD',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                        }}
                                        borderRadius="12px"
                                        border={choiseItem && choiseItem.choiseIndex === `${index}-${currentIndex}` ? '1px solid #FFF3CD' : 'none'}
                                    />
                                    <Text
                                        position="absolute"
                                        top="6px"
                                        right="6px"
                                        fontSize="12px"
                                        color="#FFF3CD"
                                        fontWeight="600"
                                    >
                                        {item.token_properties?.ash || '0'}
                                    </Text>
                                </Box>
                            </SwiperSlide>
                        );
                    });
                })}

            </Swiper>
            {
                ((!isEnd && NftList.name !== 'urn') && NftList?.list > 3) && (
                    <IconButton
                        aria-label="Next"
                        variant="arrow"
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="22px"
                        top="50%"
                        transform="translateY(-50%)"
                        bottom={0}
                        zIndex={1}
                        onClick={handleNext}
                        w="22px"
                        h="22px"
                        minWidth="22px"
                    />
                )
            }
            {
                ((!isEnd && NftList.name === 'urn') && UrnLength > 3) && (
                    <IconButton
                        aria-label="Next"
                        variant="arrow"
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="22px"
                        top="50%"
                        transform="translateY(-50%)"
                        bottom={0}
                        zIndex={1}
                        onClick={handleNext}
                        w="22px"
                        h="22px"
                        minWidth="22px"
                    />
                )
            }

        </Flex>
    );
};

Carousel.propTypes = {
    NftList: PropTypes.shape({
        name: PropTypes.string,
        list: PropTypes.array,
    }),
    selectItem: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
    NftList: {
        name: '',
        list: [],
    },
};

export default Carousel;
