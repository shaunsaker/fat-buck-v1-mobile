import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import {
  ButtonContainer,
  BUTTON_CONTAINER_BORDER_RADIUS,
} from './ButtonContainer';
import { colors } from '../colors';
import { TextInputProperties, TextInput, Platform } from 'react-native';

const InputContainer = styled(TextInput)`
  flex: 1;
  padding: 0 ${BUTTON_CONTAINER_BORDER_RADIUS}px;
  font-family: 'Recursive-Bold';
  font-weight: ${Platform.OS === 'android'
    ? 'normal'
    : 'bold'}; /* fix font-family android */
  font-size: 18px;
  color: ${colors.white};
`;

interface InputBaseProps extends InputProps {
  isFocussed: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

const InputBase = ({
  isFocussed,
  placeholder,
  handleFocus,
  handleBlur,
  ...props
}: InputBaseProps) => {
  return (
    <ButtonContainer active={isFocussed}>
      <InputContainer
        {...props}
        placeholderTextColor={colors.grey}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </ButtonContainer>
  );
};

interface InputProps extends TextInputProperties {}

export const Input = (props: InputProps) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const onFocus = useCallback(() => {
    setIsFocussed(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocussed(false);
  }, []);

  return (
    <InputBase
      {...props}
      isFocussed={isFocussed}
      handleFocus={onFocus}
      handleBlur={onBlur}
    />
  );
};
