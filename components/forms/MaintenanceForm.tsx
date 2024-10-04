import React, {useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import Divider from "@/components/Divider";
import CustomDatePicker from "@/components/CustomDatePicker";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import ThemedInputText from "@/components/ThemedInputText";
import MaintenancePicker from "@/components/MaintenancePicker";
import ThemedButton from "@/components/ThemedButton";
import {useGlobalContext} from "@/context/GlobalProvider";
import {PartPurchaseEventFormType, PartPurchaseEventType} from "@/types/maintenance";
import ListItemDetail from "@/components/ListItemDetail";
import PartPurchaseForm from "@/components/forms/PartPurchaseForm";
import axios from "axios";
import {API} from "@/constants/endpoints";


interface MaintenanceFormProps {
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    cancelMaintenanceReport: () => void
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handlePartInputChange: (name: string, value: string) => void
    partPurchaseFormData: PartPurchaseEventFormType
}


const MaintenanceForm = ({
                             selectPart,
                             searchTerm,
                             setIsPartSelected,
                             isPartSelected,
                             handleDateChange,
                             handleMaintenanceReportFormChange,
                             handleMaintenanceReportSubmission,
                             cancelMaintenanceReport,
                             handlePartPurchaseFormChange,
                             partPurchaseFormData,
                             handlePartInputChange,
                         }: MaintenanceFormProps) => {

    const {partPurchaseEvents, setPartPurchaseEvents} = useGlobalContext();
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);
    const handleCreateServiceProvider = () => {

    }
    const handlePartPurchaseEventCreation = () => {
        setShowPartPurchaseEventForm(true);
    }
    const handleEditPartPurchaseEvent = () => {

    }
    const handlePartPurchaseEventCancellation = () => {
        setShowPartPurchaseEventForm(false);
    }
    const handlePartPurchaseCreation = async () => {
        try {
            // Validating and formatting data
            if (!partPurchaseFormData.cost || !partPurchaseFormData.part || !partPurchaseFormData.provider || !partPurchaseFormData.purchase_date) {
                Alert.alert("Error", "Please fill all fields!.")
                return
            }
            let partPurchaseEventDataToSend: PartPurchaseEventType = {
                ...partPurchaseFormData,
                purchase_date: partPurchaseFormData.purchase_date.toLocaleDateString("en-CA", {year: "numeric", month: "2-digit", day: "2-digit"})
            }
            const response = await axios.post(`${API}maintenance/part-purchase-events/`,
                partPurchaseEventDataToSend,
                {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setPartPurchaseEvents([...partPurchaseEvents, response.data])
            setShowPartPurchaseEventForm(false);
        } catch (error: any) {
            console.log(error.response.data)
        }
    }
    return (
        <View className={"w-full justify-center items-center"}>
            {showPartPurchaseEventForm ?
                <PartPurchaseForm partPurchaseFormData={partPurchaseFormData}
                                  handlePartPurchaseFormChange={handlePartPurchaseFormChange}
                                  handlePartInputChange={handlePartInputChange}
                                  searchTerm={searchTerm} selectPart={selectPart}
                                  setIsPartSelected={setIsPartSelected}
                                  isPartSelected={isPartSelected}
                                  handleDateChange={handleDateChange}
                                  handlePartPurchaseEventCancellation={handlePartPurchaseEventCancellation}
                                  handlePartPurchaseCreation={handlePartPurchaseCreation}
                />
                :
                <View className={"w-[94%] bg-white rounded p-5"}>
                    <View className={"gap-2 mb-3"}>
                        <Text className={"font-semibold text-txt text-base"}>Maintenance Form</Text>
                        <Text className={"font-open-sans text-txt text-sm"}>Fill in vehicle's details below.</Text>
                    </View>
                    <View className={"flex-1"}>
                        {partPurchaseEvents.map((partPurchaseEvent, idx) => {
                            return (
                                <Pressable onPress={handleEditPartPurchaseEvent} key={idx}>
                                    <View className={"flex-1 p-[16px] bg-white rounded shadow mb-3"}>
                                        <ListItemDetail label={"Part name"} value={partPurchaseEvent.part} textStyle={"text-txt"}/>
                                        <ListItemDetail label={"Provider name"} value={partPurchaseEvent.provider} textStyle={"text-txt"}/>
                                        <ListItemDetail label={"Purchase date"} value={partPurchaseEvent.purchase_date} textStyle={"text-txt"}/>
                                        <ListItemDetail label={"Cost"} value={partPurchaseEvent.cost} textStyle={"text-txt"}/>
                                    </View>
                                </Pressable>
                            )
                        })}
                        <ThemedButton title={"Create part purchase event"}
                                      handlePress={handlePartPurchaseEventCreation}
                                      containerStyles={"bg-secondary p-5 rounded-[50%]"}
                                      textStyles={"text-white text-base font-semibold"}
                        />
                    </View>

                    <Divider/>
                    <View>
                        <Text className={"font-semibold text-txt text-sm"}>Maintenance Report Form</Text>
                        <MaintenancePicker containerStyles={"mb-3"}
                                           title={"Pick service provider"}
                                           name={"service_provider"}
                                           value={"value"}
                                           items={[{label: "one", value: "ONE"}, {label: "two", value: "TWO"}]}
                                           handleItemChange={() => console.log("service provider picked")}
                                           buttonTitle={"Create service Provider"}
                                           handleButtonPress={handleCreateServiceProvider}
                        />
                        <View className={"flex-row"}>
                            <CustomDatePicker date={new Date()} handleChange={handleDateChange} label={"Start date"} name={"start_date"}/>
                            <CustomDatePicker date={new Date()} handleChange={handleDateChange} label={"End date"} name={"end_date"}/>
                        </View>
                        <ThemedInputText placeholder={"Enter the Cost"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'cost'} containerStyles={"bg-background p-5"}/>
                        <ThemedInputText placeholder={"Enter Mileage"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'mileage'} containerStyles={"bg-background p-5"}/>
                        <ThemedInputText placeholder={"Notes"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'mileage'} containerStyles={"bg-background p-5"}/>
                        <Divider/>
                        <ThemedButton title={"Submit Report"}
                                      handlePress={handleMaintenanceReportSubmission}
                                      containerStyles={"bg-primary p-5 rounded-[50%]"}
                                      textStyles={"text-white text-base font-semibold"}
                        />
                        <ThemedButton title={"Cancel"}
                                      handlePress={cancelMaintenanceReport}
                                      containerStyles="bg-default p-5 rounded-[50%] mt-[10px]"
                                      textStyles={"text-white font-semibold text-base"}
                        />
                    </View>
                </View>
            }
        </View>
    );
};

export default MaintenanceForm;
