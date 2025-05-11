import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useTextSize } from './TextSizeContext';

export const ChooseTextSize = () => {
  const { textSize, setSize } = useTextSize();

  return (
    <div>
        <ButtonGroup aria-label="Text size selector">
            <Button
                style={{ fontSize: "15px", color: "white"}}
                variant={textSize === 'small' ? 'primary' : 'outline-primary'}
                onClick={() => setSize('small')}
            >
                Aa
            </Button>
            <Button
                style={{ fontSize: "20px", color: "white"}}
                variant={textSize === 'medium' ? 'primary' : 'outline-primary'}
                onClick={() => setSize('medium')}
            >
                Aa
            </Button>
            <Button
                style={{ fontSize: "30px", color: "white"}}
                variant={textSize === 'large' ? 'primary' : 'outline-primary'}
                onClick={() => setSize('large')}
            >
                Aa
            </Button>
        </ButtonGroup>
    </div>
  );
};