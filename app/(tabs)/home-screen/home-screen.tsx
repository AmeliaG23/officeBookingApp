import ThemedDropdown from "@/components/themed-dropdown/themed-dropdown";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { useBookings } from "@/hooks/use-bookings/use-bookings";
import { useSeats } from "@/hooks/use-seats/ use-seats";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";

const datesBlacklistFunc = (date: { isoWeekday: () => number }) => {
  return date.isoWeekday() === 6 || date.isoWeekday() === 7;
};

const today = new Date();
const startOfCurrentWeek = new Date(today);
startOfCurrentWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

const HomeScreen = () => {
  const { fetchBookings } = useBookings();
  const { fetchSeats } = useSeats();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchSeats();
  }, [fetchBookings, fetchSeats]);

  return (
    <ThemedView style={{ flex: 1, padding: 30 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarStrip
          scrollable
          useIsoWeekday
          numDaysInWeek={7}
          startingDate={startOfCurrentWeek}
          minDate={startOfCurrentWeek}
          selectedDate={selectedDate}
          onDateSelected={(date) => setSelectedDate(date.toDate())}
          // markedDates={markedDates}
          calendarHeaderStyle={{ color: Colors.blue.text }}
          dateNameStyle={{ color: Colors.blue.text }}
          dateNumberStyle={{ color: Colors.blue.text }}
          highlightDateNameStyle={{
            color: Colors.blue.text,
            fontWeight: "700",
          }}
          highlightDateNumberStyle={{
            color: Colors.blue.text,
            fontWeight: "700",
          }}
          markedDatesStyle={{ backgroundColor: Colors.blue.text }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            highlightColor: Colors.blue.card,
          }}
          datesBlacklist={datesBlacklistFunc}
          style={{ marginTop: 20 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ThemedDropdown
            data={[
              { label: "Floor 1", value: "1" },
              { label: "Floor 2", value: "2" },
            ]}
            icon="building"
            placeholder="Floor"
            value={selectedFloor}
            onChange={setSelectedFloor}
          />
          <ThemedDropdown
            data={[
              { label: "Team 1", value: "1" },
              { label: "Team 2", value: "2" },
            ]}
            icon="team"
            placeholder="Team"
            value={selectedTeam}
            onChange={setSelectedTeam}
          />
        </View>
        {/* https://www.npmjs.com/package/react-native-scrollable-calendar-strip?activeTab=readme */}
      </ScrollView>
    </ThemedView>
  );
};

export default HomeScreen;
