import BookingModal from "@/app/modals/booking-modal/booking-modal";
import DeleteBookingModal from "@/app/modals/delete-booking-modal/delete-booking-modal";
import { ThemedCard } from "@/components/themed-card/themed-card";
import ThemedDropdown from "@/components/themed-dropdown/themed-dropdown";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import currentDate from "@/utils/currentDate";
import unavailableDates from "@/utils/unavailable-booking-days/unavailable-booking-days";
import { Pressable, ScrollView, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { useHomeScreen } from "./use-home-screen";

const HomeScreen = () => {
  const {
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
    <ThemedView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}>
      <View>
        <CalendarStrip
          scrollable
          useIsoWeekday
          numDaysInWeek={7}
          minDate={currentDate}
          selectedDate={selectedDate}
          onDateSelected={(date) => onDateSelected(date.toDate())}
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
            duration: 100,
            highlightColor: Colors.blue.card,
          }}
          datesBlacklist={unavailableDates}
          iconLeft={null}
          disabledDateNameStyle={{ color: Colors.light.icon }}
          disabledDateNumberStyle={{ color: Colors.light.icon }}
          style={{
            height: 100,
            marginTop: 4,
            width: 400,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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
      <View
        style={{
          flex: 1,
          marginTop: 12,
        }}
      >
        <ScrollView>
          {sortedSeats.map((item) => (
            <Pressable
              key={item.$id}
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
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderWidth: 1,
                  backgroundColor: Colors.blue.lightCard,
                  borderColor: Colors.blue.tint,
                  borderLeftColor: item.isBooked
                    ? Colors.red.text
                    : Colors.green.tint,
                  borderLeftWidth: 6,
                  width: "90%",
                  alignSelf: "center",
                }}
              >
                <ThemedText
                  style={{ fontWeight: "700" }}
                >{`Seat ${item.seatNumber}`}</ThemedText>
                <ThemedText>{`Floor ${item.floorNumber} . ${item.teamArea}`}</ThemedText>
                {item.isBooked && (
                  <ThemedText style={{ color: Colors.red.text }}>
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
