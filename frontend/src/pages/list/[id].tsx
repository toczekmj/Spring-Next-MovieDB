import {
    Card,
    CardBody,
    CardHeader,
    Stack,
    Text,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component"
import React from "react";
import useSWR from "swr";
import {useRouter} from "next/router";

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());


// const fetchActors = function (actorsList: any) {
//     const aList = [];
//     for (let i = 0; i < actorsList.length; i++) {
//         aList.push(actorsList[i].firstName + " " + actorsList[i].lastName);
//         if (i != actorsList.length - 1) {
//             aList[i] = aList[i] + ',';
//         }
//     }
//     return aList;
// }
//
// const fetchComments = function(commentList: any) {
//     let comments = "";
//     for(let i = 0; i < commentList.length; i++){
//         comments +=  "<b>Użytkownik " + commentList[i].id + "</b>: " + commentList[i].text + "<br>";
//     }
//     return comments;
// }
//
// const fetchRating = function(rating: any){
//     const votes: number = parseInt(rating.votesCount);
//     const plot: number = parseInt(rating.plot);
//     const acting: number = parseInt(rating.acting);
//     const scenography: number = parseInt(rating.scenography)
//     return [plot/votes, acting/votes, scenography/votes];
// }


export default function SingleMoviePage() {

    const router = useRouter();
    const {id} = router.query;
    const APIURL = `http://api.projektimdb.it/api/v1/movies/get/byid/${String(id)}`;
    const {data, error} = useSWR(APIURL, fetcher);
    if (error) return <div>Failed to fetch</div>
    if (!data) return <div>Loading</div>
    // const actorsList = fetchActors(data.actors);
    // const commentList = fetchComments(data.comments);
    // const rating = fetchRating(data.rating); //plot, acting, scenography
    //
    // console.log("plot: " + rating[0] + ", acting: " + rating[1] + ", scenography: " + rating[2]);
    //
    // return (
    //     <Stack h="100vh" align="center" justifyContent="center" spacing={55}>
    //         <Card w="40%">
    //             <CardHeader>
    //                 <Text fontSize="26px" fontWeight="700">
    //                     {data?.title}
    //                 </Text>
    //             </CardHeader>
    //
    //             <CardBody>
    //                 <Text><b>Reżyser:</b> {data.director}</Text>
    //                 <Text><b>Rok produkcji:</b> {data.productionYear}</Text>
    //                 <Text><b>Główna obsada:</b> {actorsList}</Text>
    //                 <Text><b>Opinie telewidzów:</b></Text>
    //                 <Text>
    //                     Aktorstwo:
    //                     <ReactStars count={5} value={rating[1]} size={20} isHalf={true} edit={false}></ReactStars>
    //                 </Text>
    //                 <Text>
    //                     Fabuła:
    //                     <ReactStars count={5} value={rating[0]} size={20} isHalf={true} edit={false}></ReactStars>
    //                 </Text>
    //                 <Text>
    //                     Scenografia:
    //                     <ReactStars count={5} value={rating[2]} size={20} isHalf={true} edit={false}></ReactStars>
    //                 </Text>
    //             </CardBody>
    //         </Card>
    //
    //
    //         {/*komentarze */}
    //         <Card w="40%">
    //             <CardHeader>
    //                 <Text fontSize="26px" fontWeight="700">
    //                     Komentarze
    //                 </Text>
    //             </CardHeader>
    //             <CardBody>
    //                 <Text dangerouslySetInnerHTML={{__html: commentList}}></Text>
    //             </CardBody>
    //         </Card>
    //     </Stack>
    // );

    return (
        <div id={"test"}>Chuj</div>

    );
}
