import { InputNumber, Radio } from 'antd';
import React from 'react';
import { EnumScaleType } from '../types/image';
import './ProcessNodeScale.css';

interface ScaleProps {
  scaleType: EnumScaleType;
  scaleRatio: number;
  scaleWidth: number;
  onChange: (ratio: number, width: number) => void;
}

const ProcessNodeScale: React.FC<ScaleProps> = ({ scaleType, scaleRatio, scaleWidth, onChange }) => {
  const scaleOptions = [0.25, 0.5, 1, 2, 4];
  const scaleWidthProps = {
    mode: 'spinner' as const,
    min: 1,
    max: 4096,
    defaultValue: scaleWidth,
    onChange: (e: number | null) => {
      if (e !== null) {
        onChange(scaleRatio, e);
      }
    },
    style: { width: 150 },
  };
  return (
    <>
      {scaleType === EnumScaleType.RATIO ? (
        <div className="image-scale__controls">
          <div className="image-scale__dimensions">
            <Radio.Group value={scaleRatio} onChange={e => onChange(e.target.value, scaleWidth)}>
              {scaleOptions.map(value => (
                <Radio className="image-scale__radio" key={value} value={value}>
                  {value}x
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
      ) : (
        <div className="image-scale__controls">
          <div className="image-scale-width__dimensions">
            <InputNumber {...scaleWidthProps}></InputNumber>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessNodeScale;
