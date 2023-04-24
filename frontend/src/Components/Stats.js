import React from "react";
import { useSelector } from "react-redux";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import "./Stats.css";
//
//
const Stats = () => {
  const [budget, expenses] = useSelector(state => {
    return [state.budget.data, state.expenses.data];
  });

  console.log(budget, expenses);

  const totalExpense = expenses.reduce((pv, cv) => {
    return pv + cv.amount;
  }, 0);

  const totalBudget = budget.amount;

  return (
    <div className='StatsContainer'>
      <Row gutter={16}>
        <div className='statsBox'>
          <Col span={16}>
            <Card bordered={false} className='card'>
              <Statistic
                title='Total Budget'
                value={totalBudget}
                valueStyle={{
                  color: "#3f8600",
                }}
                suffix='/-'
              />
            </Card>
          </Col>
        </div>

        <div className='statsBox'>
          <Col span={16}>
            <Card bordered={false} className='card'>
              <Statistic
                title='Total Expense'
                value={totalExpense}
                valueStyle={{
                  color: "#3f8600",
                }}
                suffix='/-'
              />
            </Card>
          </Col>
        </div>

        <div className='statsBox'>
          <Col span={16}>
            <Card bordered={false} className='card'>
              <Statistic
                title='Budget Remaining'
                value={totalBudget - totalExpense}
                valueStyle={{
                  color: "#cf1322",
                }}
                suffix='/-'
              />
            </Card>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default Stats;
