import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRecoilValue } from "recoil";
import { settingsAtom } from "@app/utils/atoms";

import { useNavigation } from "@react-navigation/native";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import moment from "moment";

const Home = () => {
  const navigation = useNavigation();
  const settings = useRecoilValue(settingsAtom);
  let [leftTime, setLeftTime] = React.useState([0, 0, 0, 0]);
  let [editable, setEditable] = React.useState(false);
  let [out, setOut] = React.useState(true);

  const texts = [
    ["아 졸리다", "이번주는 집에 언제 가나요?", "집가고싶다!!!!", "N주차 잔류중..."],
    ["치킨라면피자콜라사이다", "지금당장 잠좀자고싶다", "아 심야자습가기 싫다", "너무 행복하다"],
    ["집에 가면 무슨기분일까;;;", "학교탈출하고싶다 너무", "몰래 집갔다올까;; 집가고싶다", "집보내줘 집보내줘"],
  ];

  const fillZero = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const calcLeftTime = React.useCallback(() => {
    let now = moment();
    let left = moment();
    if (!(moment(settings.lastUpdated).week() === now.week() || (now.day() === 0 && moment(settings.lastUpdated).week() + 1 === now.week() && moment(now).add(1, "seconds").hours() < 20))) {
      navigation.replace("Settings");
    }
    if (settings.gohomeType === 3) {
      return;
    }
    if (moment(settings.lastUpdated).week() !== now.week() && now.day() === 0) {
      now.add(1, "week");
    }
    if (settings.gohomeType === 1) {
      left.day(5).hour(17).minute(0).second(0).millisecond(0);
    } else if (settings.gohomeType === 2) {
      left.day(6).hour(8).minute(0).second(0).millisecond(0);
    }
    if (now <= left) {
      setOut(true);
    } else {
      left.day(7).hour(20).minute(0).second(0).millisecond(0);
      setOut(false);
    }
    let diff = left.diff(now);
    let duration = moment.duration(diff);
    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();
    ReactNativeHapticFeedback.trigger("impactMedium", { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
    setLeftTime([days, hours, minutes, seconds]);
    setEditable(now.day() !== 0 || (now.day() === 0 && moment(now).add(-1, "seconds").hours() >= 20));
  }, [settings.gohomeType]);

  React.useEffect(() => {
    calcLeftTime();
    let timer = setInterval(() => {
      calcLeftTime();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [calcLeftTime]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>이번주 나는.. 집에 언제 가나요?😭</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("Settings");
          }}
          style={{
            opacity: editable ? 1 : 0.5,
          }}
          disabled={!editable}>
          <Text style={styles.settings}>집에 가는 날 설정하기</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.timer, { display: settings.gohomeType === 3 ? "none" : "flex" }]}>
        <Text style={styles.subtitle}>{out ? "집에 가기까지.." : "감옥 수감까지.."}</Text>
        <View style={styles.times}>
          <View style={styles.time}>
            <Text
              style={[
                styles.number,
                {
                  width: 32,
                },
              ]}>
              {leftTime[0]}
            </Text>
            <Text style={styles.unit}>일</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.number}>{fillZero(leftTime[1])}</Text>
            <Text style={styles.unit}>시간</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.number}>{fillZero(leftTime[2])}</Text>
            <Text style={styles.unit}>분</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.number}>{fillZero(leftTime[3])}</Text>
            <Text style={styles.unit}>초</Text>
          </View>
        </View>
        <Text
          style={[
            styles.subtitle,
            {
              textAlign: "right",
            },
          ]}>
          남았어요!
        </Text>
      </View>
      <View style={[styles.sad, { display: settings.gohomeType === 3 ? "flex" : "none" }]}>
        <Text style={styles.big}>잔류</Text>
      </View>
      <View style={styles.bubbles}>
        {texts.map((line, index) => (
          <View style={styles.bubble} key={index}>
            {line.map((text, index) => (
              <View style={styles.bubbleItem} key={index}>
                <Text style={styles.bubbleText}>{text}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.copyright}>
        <Text style={styles.by1}>한국디지털미디어고등학교 21기 해킹방어과</Text>
        <Text style={styles.by2}>박성민 개발 | 조현우 디자인 | 김휘림 훈수</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Pretendard-Bold",
    color: "#ffffff",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    marginTop: 100,
  },
  settings: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: "#ffffff",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#ffffff",
    margin: -20,
    padding: 20,
  },
  timer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 24,
    gap: 28,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "#ffffff",
  },
  times: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  number: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: "hidden",
    width: 48,
    textAlign: "center",
  },
  unit: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "#ffffff",
  },

  sad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  big: {
    fontSize: 100,
    fontFamily: "Pretendard-Bold",
    color: "#ffffff",
  },

  bubbles: {
    justifyContent: "center",
    gap: 12,
    marginBottom: 60,
  },
  bubble: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  bubbleItem: {
    backgroundColor: "#ffffff29",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: "#ffffff",
  },

  copyright: {
    marginBottom: 20,
    alignItems: "center",
    gap: 8,
  },
  by1: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: "#ffffff",
    opacity: 0.8,
  },
  by2: {
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: "#ffffff",
    opacity: 0.8,
  },
});

export default Home;
