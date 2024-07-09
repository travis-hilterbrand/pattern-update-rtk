import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  a {
    font-size: 22px;
    color: #777;
    &:hover {
      color: #000;
    }
  }
`;

type PokeListProps = {
  selectedId: string;
  ids: string[];
  onSelect: (id: string) => void;
};
export const PokeList = ({ selectedId, ids, onSelect }: PokeListProps) => {
  return (
    <Container>
      {ids.map((id) => (
        <a
          key={id}
          href="#"
          style={{ color: selectedId === id ? "rebeccapurple" : undefined }}
          onClick={() => onSelect(id)}
        >
          {id}
        </a>
      ))}
    </Container>
  );
};
