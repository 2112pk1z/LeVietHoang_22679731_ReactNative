import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useDatabase } from "../hooks/useDatabase";

export default function StatisticsScreen() {
  const { getAllExpenses } = useDatabase();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      const all = await getAllExpenses();

      if (all.length === 0) {
        setChartData([
          { month: "2025-10", thu: 5000000, chi: 2000000 },
          { month: "2025-11", thu: 10000000, chi: 4000000 },
        ]);
        return;
      }

      const stats: Record<string, { thu: number; chi: number }> = {};

      all.forEach((item) => {
        const month = item.createdAt.slice(0, 7);
        if (!stats[month]) stats[month] = { thu: 0, chi: 0 };
        if (item.type === "Thu") stats[month].thu += item.amount;
        else stats[month].chi += item.amount;
      });

      const formatted = Object.entries(stats).map(([month, { thu, chi }]) => ({
        month,
        thu,
        chi,
      }));

      setChartData(formatted);
    };

    loadStats();
  }, []);

  // 🔹 Tạo dữ liệu đúng định dạng cho sideBySideBars
  const thuData = chartData.map((item) => ({
    value: item.thu,
    label: item.month, // chỉ để hiển thị trục X
    frontColor: "#4CAF50",
  }));

  // ⚠️ KHÔNG thêm label vào data2
  const chiData = chartData.map((item) => ({
    value: item.chi,
    frontColor: "#F44336",
  }));

  const maxValue = Math.max(
    ...chartData.map((i) => Math.max(i.thu, i.chi)),
    1000
  );

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
          paddingTop: 40,
        }}
      >
        Biểu đồ thống kê Thu - Chi
      </Text>

      <View style={{ alignItems: "center" }}>
        <BarChart
          data={thuData}
          data2={chiData}
          sideBySideBars
          height={300}
          barWidth={20}
          spacing={40}
          barBorderRadius={4}
          yAxisThickness={1}
          xAxisThickness={1}
          yAxisTextStyle={{ color: "#333" }}
          noOfSections={5}
          yAxisLabelWidth={60}
          isAnimated
          maxValue={maxValue}
        />
      </View>

      {/* Legend */}
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#4CAF50",
              marginRight: 6,
            }}
          />
          <Text>Thu</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#F44336",
              marginRight: 6,
            }}
          />
          <Text>Chi</Text>
        </View>
      </View>
    </ScrollView>
  );
}
