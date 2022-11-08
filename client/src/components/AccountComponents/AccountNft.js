import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../../AppContext'
import { NavLink } from 'react-router-dom';
import { Box, Chip, Stack, Typography,Grow } from '@mui/material';
import Media from '../Skeleton';
import AccountNftsCard from './AccountNftsCard';
const AccountNft = () => {
  const context = useContext(AppContext);
  const {address, userProfileImg, userId} = context.state;
  const options = {method: 'GET'};
  const [nftlist, setNftlist] = useState([]);

  useEffect(() => {
    fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20&include_orders=false`, options)
      .then(response => response.json())
      .then((response) => {
        console.log(response.assets)
        if(response.assets){
          setNftlist(response.assets)
        }
      })
      .catch(err => console.error(err));
      }, [userId]);

  return (

    <>
    <Box component="div" className='account-nft'>
      <Stack direction="row" spacing={7} mb={5} justifyContent="center" alignItems="center">
        <Typography variant="h5"
          sx={{
            fontWeight:600,
            fontFamily:"Poppins"
        }}>NFT
        </Typography>
        <Box component="div">
          <NavLink className="write-link" to='/mint'>
            <Chip label="Mint"
              sx={{
                textDecorationLine: "none",
                fontWeight:500,
                color: "white",
                fontSize: "16px",
                fontFamily:"Poppins",
                bgcolor:'rgba(231,127,112)',
                cursor:"pointer"}}/>
          </NavLink>
        </Box>
        </Stack>
        <Grow in={true} style={{ transformOrigin: '0 2 0' }} {...(true ? { timeout: 1200 } : {})}>
          <Stack direction="column" spacing={3} width="80%" ml={7}>
            {nftlist ?
            nftlist.map((el, idx) => {
              return (
                <AccountNftsCard
                  key={idx}
                  userId={userId}
                  image_preview_url={el.image_preview_url}
                  userProfileImg={userProfileImg} />
              );
            })
            :
            <>
              <Media />
              <Media />
              <Media />
            </>
            }
          </Stack>
        </Grow>
      </Box>
    </>
  )
}

export default AccountNft