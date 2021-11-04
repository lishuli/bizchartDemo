import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

export default () => {
  const data = [
    {
      name: '央企集团内',
      公司a: 36.97,
      公司b: 30.0,
      公司c: 40.03,
      公司d: 20.0,
      公司e: 10.0,
    },
    {
      name: '央企集团间',
      公司a: 36.97,
      公司b: 20.0,
      公司c: 30.03,
      公司d: 40.0,
      公司e: 10.0,
    },
    {
      name: '央企集团外',
      公司a: 36.97,
      公司b: 10.0,
      公司c: 20.03,
      公司d: 30.0,
      公司e: 40.0,
    },
  ];
  const ds = new DataSet();
  const dv = ds.createView().source(data);

  dv.transform({
    type: 'fold',
    fields: ['公司a', '公司b', '公司c', '公司d', '公司e'], // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  });
  return (
    <Chart height={400} width={500} forceFit data={dv}>
      <Legend />
      <Axis name="type" />
      <Axis name="value" />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
        htmlContent={(title, items) => {
          const htmlArr = items.map((item, index) => {
            return `
            <li data-index='${index}' style='margin: 0px 0px 4px;list-style-type: none;padding: 0px;'>
              <svg viewBox="0 0 5 5" class="g2-tooltip-marker" style="width: 5px; height: 5px; border-radius: unset; display: inline-block; margin-right: 8px;"><path d="M2.5,2.5m-2.5,0a2.5,2.5,0,1,0,5,0a2.5,2.5,0,1,0,-5,0" fill="${item.color}" stroke="none"></path></svg>
              ${item.name}
              <span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">${item.value}</span>
            </li>`;
          });
          return `
          <div 
            class="g2-tooltip" 
            style='
              position:absolute;
              transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
              z-index: 8;
              background-color: rgba(255, 255, 255, 0.9);
              box-shadow: rgb(174 174 174) 0px 0px 10px;
              border-radius: 3px;
              color: rgb(87, 87, 87);
              font-size: 12px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
              lineHeight: 20px;
              padding: 10px 10px 6px;
            '
            <ul class="g2-tooltip-list" style='margin: 0px;list-style-type: none;padding: 0px;'>
              ${htmlArr.join('')}
            </ul>
          </div>`;
        }}
      />
      <Geom
        type="interval"
        position="type*value"
        color="name"
        adjust={[
          {
            type: 'dodge',
            marginRatio: 1 / 32,
          },
        ]}
      />
    </Chart>
  );
};
