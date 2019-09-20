import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle, Ribbon, SymbolShape, Rect } from "@potion/element";
import { Chord } from "@potion/layout";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);

  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <h1>Chords</h1>

      <Svg width={400} height={400}>
        <Chord
          data={[
            [11975, 5871, 8916, 868, 1234, 2345, 4567],
            [1951, 10048, 2060, 6171, 4321, 322, 435],
            [8010, 16145, 8090, 8045, 4534, 212, 5432],
            [1013, 812, 4423, 19382, 236, 762, 82],
            [7895, 990, 940, 6907, 5543, 122, 1231],
            [1013, 214, 443, 2357, 4745, 262, 2355],
            [9726, 726, 88, 1023, 847, 222, 9898]
          ]}
          animate
          nodeEnter={d => ({
            ...d,
            sourceStartAngle: d.sourceEndAngle,
            targetStartAngle: d.targetEndAngle
          })}
          animate
        >
          {nodes =>
            nodes.map((node, i) => {
              if (i < colors.length) {
                return (
                  <Ribbon
                    {...node}
                    fill={colors[i].code.hex}
                    stroke={colors[i].code.hex}
                    fillOpacity={0.9}
                    radius={400 * 0.4}
                    transform={{ translate: [200, 200] }}
                  />
                );
              }
              return null;
            })
          }
        </Chord>
      </Svg>

      <h1>Balloons</h1>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (<>
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                    <Rect x={x} y={y} width={r} height={r} fill={colors[i].code.hex} />
                    </>
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
