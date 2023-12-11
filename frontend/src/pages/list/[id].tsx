
import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import {func} from "prop-types";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const fetchActors = function (actorsList: any) {
  const aList = [];
  for(let i = 0; i < actorsList.length; i++){
    aList.push(actorsList[i].firstName + " " + actorsList[i].lastName);
    if(i != actorsList.length-1){
      aList[i] = aList[i] + ',';
    }
  }
  return aList;
}

export default function SingleMoviePage() {
  const {data, error} = useSWR('http://localhost/api/v1/movies/get/byid/1', fetcher);
  if(error) return <div>Failed to fetch</div>
  if(!data) return <div>Loading</div>
  const actorsList = fetchActors(data.actors);

  return (
    <Stack h="100vh" align="center" justifyContent="center" spacing={55}>
      <Card w="40%">
        <CardHeader>
          <Text fontSize="26px" fontWeight="700">
            {data?.title}
          </Text>
        </CardHeader>
        <CardBody>
          {/* trzeba dopisac jakies rzeczy w stylu reżyser, aktorzy itd  */}
          {/* <Text>Dodano: {movie?.addDate}</Text> */}
          {/* <Text>{movie?.popularity}</Text> */}
          <Text>Reżyser: {data.director}</Text>
          <Text>Rok produkcji: {data.productionYear}</Text>
          <Text>Główna obsada: {actorsList}</Text>
          
        </CardBody>
      </Card>

      <Card w="20%">
        <CardHeader>
          <Text fontSize="26px" fontWeight="700">
            Komentarze
          </Text>
        </CardHeader>
        <CardBody>
          <Text></Text>
          <Text>Użytkownik1: Bardzo dobry film</Text>
          <Text>
            Użytkownik2: Muszę powiedzieć, że pomimo nie lubię tego reżysera,
            ten film zaskoczył mnie pozytywnie.
          </Text>
        </CardBody>
      </Card>
    </Stack>
  );
}


const callAPI = async () => {
	try {
		const res = await fetch('http://localhost/api/v1/movies/get/byid/1');
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};