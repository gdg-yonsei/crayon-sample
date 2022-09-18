import LabelItem from '@components/LabelItem';
import Template from '@components/Template';
import { get } from '@utils/fetch';
import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

interface Props {
  categories: string[];
}

const CategoryPage: NextPage<Props> = ({ categories }) => {
  return (
    <Template>
      <Wrapper>
        {categories.map((category) => (
          <LabelItem key={category} url={`/?category=${category}`}>
            {category}
          </LabelItem>
        ))}
      </Wrapper>
    </Template>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const categories = await get<string[]>('/categories');

    return {
      props: { categories },
    };
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;
