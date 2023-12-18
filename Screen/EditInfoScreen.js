// EditInfoScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  setWorkAt,
  setLivesIn,
  setFrom,
  setRelationshipStatus,
  setFollower,
} from "../Redux/UserSlice";
import Routes from "../Utility/Routes";

export default function EditInfoScreen({ navigation }) {
  const dispatch = useDispatch();
  const { workAt, livesIn, from, relationshipStatus, follower } = useSelector(
    (state) => state.userdata
  );

  const [editingText, setEditingText] = useState("");
  const [editingField, setEditingField] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (field, initialValue) => {
    setIsEditing(true);
    setEditingField(field);
    setEditingText(initialValue);
  };

  const handdleSaveAndRedireact = () => {
    navigation.navigate(Routes.PROFILE_Tab);
  };

  const handleSave = () => {
    switch (editingField) {
      case "workAt":
        dispatch(setWorkAt(editingText || "Student"));
        break;
      case "livesIn":
        dispatch(setLivesIn(editingText || "Dhaka, Bangladesh"));
        break;
      case "from":
        dispatch(setFrom(editingText || "Dhaka, Bangladesh"));
        break;
      case "relationshipStatus":
        dispatch(setRelationshipStatus(editingText || "Single"));
        break;

      case "follower":
        dispatch(setFollower(editingText || "123400 peoples"));
        break;
      default:
        break;
    }
    setIsEditing(false);
    setEditingText("");
    setEditingField("");
  };

  return (
    <View>
      <Text style={styles.StyleDetailsText}>Customize your Intro</Text>
      <View style={{ padding: 10 }}>
        <View style={styles.detailsTextStyle}>
          <Text>
            Work at <Text style={styles.changeTextStyle}>{workAt}</Text>
          </Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => handleEdit("workAt", workAt)}>
              <Icon
                name="pencil"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="check"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Lives in */}
        <View style={styles.detailsTextStyle}>
          <Text>
            Lives in <Text style={styles.changeTextStyle}>{livesIn}</Text>
          </Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => handleEdit("livesIn", livesIn)}>
              <Icon
                name="pencil"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="check"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* From */}
        <View style={styles.detailsTextStyle}>
          <Text>
            From <Text style={styles.changeTextStyle}>{from}</Text>
          </Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => handleEdit("from", from)}>
              <Icon
                name="pencil"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="check"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Relationship Status */}
        <View style={styles.detailsTextStyle}>
          <Text>
            Relationship Status{" "}
            <Text style={styles.changeTextStyle}>{relationshipStatus}</Text>
          </Text>
          {!isEditing ? (
            <TouchableOpacity
              onPress={() =>
                handleEdit("relationshipStatus", relationshipStatus)
              }
            >
              <Icon
                name="pencil"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="check"
                type="font-awesome"
                color="#3395D6"
                size={17}
              />
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <>
            {/* Render the TextInput and Save button only during editing */}
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => setEditingText(text)}
              value={editingText}
              placeholder="Enter new text"
            />
            <TouchableOpacity style={styles.editButton} onPress={handleSave}>
              <Text style={{ color: "#3395D6" }}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handdleSaveAndRedireact}
          >
            <Text style={{ color: "#3395D6" }}>Save All Information</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  StyleDetailsText: {
    fontSize: 20,
    fontWeight: "700",
    padding: 15,
  },
  detailsTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    marginTop: 7,
  },
  changeTextStyle: {
    fontSize: 15,
    fontWeight: "600",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#CCE8FF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
