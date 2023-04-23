import Image from 'next/image';
import { Flex, Text, Grid } from '@chakra-ui/react';
import Layout from '@/layout';
import MobileIcon from '@/assets/images/mobileIcon.svg';

function MobilePage() {
    return (
        <Layout>
            <Flex
                maxW="1920px"
                bgColor="#1E1E1E"
                w="100%"
                minHeight="100vh"
                position="relative"
                justifyContent="center"
                alignItems="center"
            >
                <Grid gridAutoColumns="row" justifyItems="center">
                    <Image src={MobileIcon} alt="Mobile Icon" />
                    <Text color="#FFF3CD" fontSize="28px" fontWeight={700} mt="42px" mb="20px">
                        Desktop only
                    </Text>
                    <Text color="#FFF3CD" fontSize="16px" fontWeight={400}>
                        Please access on your computer / laptop.
                    </Text>
                </Grid>

            </Flex>
        </Layout>
    );
}

export default MobilePage;
