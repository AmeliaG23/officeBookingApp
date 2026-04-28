import BookingModal from "@/app/modals/booking-modal/booking-modal";
import DeleteBookingModal from "@/app/modals/delete-booking-modal/delete-booking-modal";
import { ThemedCard } from "@/components/themed-card/themed-card";
import ThemedDropdown from "@/components/themed-dropdown/themed-dropdown";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import currentDate from "@/utils/currentDate";
import unavailableDates from "@/utils/unavailable-booking-days/unavailable-booking-days";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useHomeScreen } from "./use-home-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  calendar: {
    height: 100,
    marginTop: 4,
    width: 400,
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  content: {
    flex: 1,
    marginTop: 12,
  },
  seatCardBase: {
    marginBottom: 12,
    paddingBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 6,
    width: "90%",
    alignSelf: "center",
  },
  seatTitle: {
    fontWeight: "700",
  },
});

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  const customDatesStyles = useMemo(
    () => [
      {
        date: currentDate,
        containerStyle: {
          borderWidth: 2,
          borderColor: theme.statusWarning,
          borderRadius: 999,
        },
        dateNameStyle: {
          color: theme.textPrimary,
          fontWeight: "700",
        },
        dateNumberStyle: {
          color: theme.textPrimary,
          fontWeight: "700",
          borderBottomWidth: 3,
        },
      },
    ],
    [theme.statusWarning, theme.textPrimary],
  );

  const {
    markedDates,
    sortedSeats,
    floorOptions,
    teamOptions,
    selectedDate,
    selectedFloor,
    selectedTeam,
    isBookingModalVisible,
    isDeleteBookingModalVisible,
    seatNumber,
    setSelectedFloor,
    setSelectedTeam,
    setBookingModalVisible,
    onDateSelected,
    setDeleteBookingModalVisible,
    onDeleteBookingPressed,
    onSeatSelected,
    onBookSeatPressed,
  } = useHomeScreen();

  return (
    <ThemedView style={styles.container}>
      <View>
        <CalendarStrip
          scrollable
          useIsoWeekday
          numDaysInWeek={7}
          minDate={currentDate}
          markedDates={markedDates}
          customDatesStyles={customDatesStyles}
          selectedDate={selectedDate}
          onDateSelected={(date) => onDateSelected(date.toDate())}
          calendarHeaderStyle={{ color: theme.textPrimary }}
          dateNameStyle={{ color: theme.textPrimary }}
          dateNumberStyle={{ color: theme.textPrimary }}
          highlightDateNameStyle={{
            color: theme.textPrimary,
            fontWeight: "700",
          }}
          highlightDateNumberStyle={{
            color: theme.textPrimary,
            fontWeight: "700",
          }}
          markedDatesStyle={{ backgroundColor: theme.textPrimary }}
          daySelectionAnimation={{
            type: "background",
            duration: 100,
            highlightColor: theme.surfaceAlt,
          }}
          datesBlacklist={unavailableDates}
          iconLeft={null}
          disabledDateNameStyle={{ color: theme.textMuted }}
          disabledDateNumberStyle={{ color: theme.textMuted }}
          style={styles.calendar}
        />
        <View style={styles.filtersRow}>
          <ThemedDropdown
            data={floorOptions}
            icon="building"
            placeholder="Floor"
            value={selectedFloor}
            onChange={setSelectedFloor}
          />
          <ThemedDropdown
            data={teamOptions}
            icon="team"
            placeholder="Team"
            value={selectedTeam}
            onChange={setSelectedTeam}
          />
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView>
          {sortedSeats.map((item) => (
            <Pressable
              key={item.$id}
              disabled={item.isBooked && !item.isBookedByCurrentUser}
              accessibilityRole="button"
              accessibilityLabel={`Seat ${item.seatNumber}, floor ${item.floorNumber}, ${item.teamArea}`}
              accessibilityHint={
                item.isBooked
                  ? item.isBookedByCurrentUser
                    ? "Open to delete your booking"
                    : "Seat already booked"
                  : "Open to create booking"
              }
              accessibilityState={{
                disabled: item.isBooked && !item.isBookedByCurrentUser,
              }}
              onPress={() => {
                onSeatSelected(
                  item.seatId,
                  item.bookingId,
                  item.isBooked,
                  item.isBookedByUser,
                  item.seatNumber ?? 0,
                );
              }}
            >
              <ThemedCard
                style={{
                  ...styles.seatCardBase,
                  backgroundColor: theme.surfaceAlt,
                  borderColor: theme.border,
                  borderLeftColor: item.isBooked
                    ? theme.statusDanger
                    : theme.statusSuccess,
                }}
              >
                <ThemedText
                  style={[styles.seatTitle, { color: theme.textPrimary }]}
                >{`Seat ${item.seatNumber}`}</ThemedText>
                <ThemedText
                  style={{ color: theme.textPrimary }}
                >{`Floor ${item.floorNumber} . ${item.teamArea}`}</ThemedText>
                {item.isBooked && (
                  <ThemedText style={{ color: theme.statusDanger }}>
                    Booked by {item.isBookedByCurrentUser ? "you" : item.name}
                  </ThemedText>
                )}
              </ThemedCard>
            </Pressable>
          ))}
        </ScrollView>
        <BookingModal
          isVisible={isBookingModalVisible}
          onClosePressed={() => setBookingModalVisible(false)}
          onCreateBooking={onBookSeatPressed}
          seatNumber={seatNumber}
          date={selectedDate.toDateString()}
        />
        <DeleteBookingModal
          isVisible={isDeleteBookingModalVisible}
          onClosePressed={() => setDeleteBookingModalVisible(false)}
          onDeletePressed={onDeleteBookingPressed}
          seatNumber={seatNumber}
          date={selectedDate.toDateString()}
        />
      </View>
    </ThemedView>
  );
};

export default HomeScreen;
