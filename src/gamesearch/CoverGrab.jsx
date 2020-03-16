// import React, { useState, useEffect } from 'react';
// import {Button} from 'reactstrap';


// const CoverGrab = (props) => {

    
//     const [flag, setFlag] = useState(true);


//     const fetchCover = () => {
//         console.log('stupid', props.coverId)
        

//         fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/covers', {
//             method: 'POST',
//             body: `where id = ${props.coverId}; fields url;`,
//             headers: new Headers({
//                 'user-key': 'process.env.REACT_APP_IGDB_API_KEY',
//                 'Content-Type': 'application/json'
//             })
//         }).then((res) => res.json())
//             .then((coverData) => {
//                 console.log('coverData@@@@@@@@@@@@@', coverData)
//                 setCoverUrl(coverData)
//             }).catch(err => console.log(err))
//     }

//     useEffect(() => {
//         fetchCover()
//     }, [])

//     if(flag){
//         setFlag(false)
//         fetchCover();
//     }

//     return (
//         <>
//         <p>{props.coverId > 0 ? fetchCover : null}</p>
//         <p>coverId: {props.coverId}</p>
//         <Button onClick={() => console.log(`THIS IS RIGHT BEFORE THE COVERGRAB ${props.coverId}`)}>console log the coverId</Button>
//         <Button onClick={fetchCover}>fetch the coverUrl</Button>
//         {/* <p>coverUrl: {coverUrl}</p> */}
//         </>
//     )

// }

// export default CoverGrab;