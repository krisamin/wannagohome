import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgIcon from "@app/components/svgicon";

import { useRecoilState } from "recoil";
import { settingsAtom } from "@app/utils/atoms";

import { useNavigation } from "@react-navigation/native";

import moment from "moment";

const Settings = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useRecoilState(settingsAtom);
  const [selected, setSelected] = React.useState(settings.gohomeType || 0);
  const [canGoBack, setCanGoBack] = React.useState(false);

  React.useEffect(() => {
    setCanGoBack(navigation.canGoBack());
  }, []);

  const onSubmitted = () => {
    setSettings((prev) => ({
      ...prev,
      gohomeType: selected,
      lastUpdated: moment().format("YYYY-MM-DD"),
    }));
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {canGoBack && (
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.goBack();
            }}>
            <SvgIcon name="BackSvg" fill="#ffffff" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.text}>
        <Text style={styles.title}>이번주는 집에 언제 가시나요? 🤩</Text>
        <Text style={styles.description}>
          이 앱을 만든 개발자 & 디자이너도 금요귀가해서 <Text style={styles.bold}>집에서 치킨을 먹고 싶어요.</Text> 여러분의 로망을 적어주세요 🤪
        </Text>
      </View>
      <View style={styles.selections}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.selection, selected === 1 ? styles.selected : null]} activeOpacity={0.5} onPress={() => setSelected(1)}>
            <Text style={[styles.selectionText, selected === 1 ? styles.selectedText : null]}>금요일에 가요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.selection, selected === 2 ? styles.selected : null]} activeOpacity={0.5} onPress={() => setSelected(2)}>
            <Text style={[styles.selectionText, selected === 2 ? styles.selectedText : null]}>토요일에 가요</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.selection,
            selected === 3 ? styles.selected : null,
            {
              flex: null,
              overflow: "visible",
            },
          ]}
          activeOpacity={0.5}
          onPress={() => setSelected(3)}>
          <Text
            style={[
              styles.selectionText,
              selected === 3 ? styles.selectedText : null,
              {
                width: 1000,
                textAlign: "center",
              },
            ]}>
            아오 안가요 안간다고🤬😡🤬😡 나 잔류라고요 안간다고요 나도 가고싶다고 진짜짜증나네
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={onSubmitted}>
        <Text style={styles.buttonText}>설정하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginHorizontal: 24,
    marginTop: 32,
  },
  text: {
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "#ffffff",
  },
  description: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    color: "#ffffff",
    lineHeight: 16 * 1.6,
    opacity: 0.8,
  },
  bold: {
    fontFamily: "Pretendard-SemiBold",
  },
  selections: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: "center",
  },
  selection: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff33",
    flex: 1,
  },
  selectionText: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: "#ffffff",
  },
  selected: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  selectedText: {
    color: "#000000",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    margin: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: "#000000",
  },
});

export default Settings;
