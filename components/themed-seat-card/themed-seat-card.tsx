// import { Ionicons } from "@expo/vector-icons";
// import { View } from "react-native";
// import { ThemedCard } from "../themed-card/themed-card";
// import { ThemedText } from "../themed-text/themed-text";

// export default function ThemedSeatCard() {
//   return (
//     <ThemedCard key={seatId || seatNumber} style={styles.seatCard}>
//       <View style={styles.seatHeaderRow}>
//         <ThemedText style={styles.seatTitle}>{`Seat ${seatNumber}`}</ThemedText>
//         <Ionicons
//           style={[
//             {
//               color: isBooked ? Colors.red.text : Colors.green.text,
//               fontWeight: "700",
//             },
//           ]}
//           size={25}
//           name={isBooked ? "close" : "checkmark"}
//         />
//       </View>
//       <ThemedText
//         style={styles.seatMetaText}
//       >{`Floor ${selectedFloor} • ${selectedArea}`}</ThemedText>
//       {isBooked && (
//         <ThemedText style={{ marginTop: 6, marginBottom: 0 }}>
//           {`Booked by: ${bookedByName}`}
//         </ThemedText>
//       )}
//     </ThemedCard>
//   );
// }
