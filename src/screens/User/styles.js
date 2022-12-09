import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  padding-left: 4px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;
