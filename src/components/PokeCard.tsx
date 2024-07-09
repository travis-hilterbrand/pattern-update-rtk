import styled from "styled-components";
import { usePokemon } from "../hooks/usePokemon";

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #777;
`;

type PokeCardProps = {
  id: string;
};
export const PokeCard = ({ id }: PokeCardProps) => {
  const { data, error, isLoading } = usePokemon(id);
  return (
    <Container>
      {error && <span>Error...</span>}
      {isLoading === true && <span>Loading...</span>}
      {data && !error && (
        <>
          <div style={{ fontWeight: 700 }}>{data.name}</div>
          <img alt="pokemon" src={data.sprites.front_shiny} />
        </>
      )}
    </Container>
  );
};
