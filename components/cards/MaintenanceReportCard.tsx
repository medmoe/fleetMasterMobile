import React from 'react';
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import {Animated, Pressable, Text, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import Divider from "@/components/Divider";
import PartPurchaseEventCard from "@/components/cards/PartPurchaseEventCard";
import ServiceProviderEventCard from "@/components/cards/ServiceProviderEventCard";
import FontAwsome from "@expo/vector-icons/FontAwesome";

interface MaintenanceReportCardProps {
    maintenanceReport: MaintenanceReportWithStringsType
    handleCollapse: (id?: string) => void
    expanded: boolean
    handleMaintenanceReportDeletion: (id?: string) => void
    handleMaintenanceReportEdition: (id?: string) => void
    handleServiceProviderEventEdition: (service_provider_event_id?: string, maintenance_report_id?: string) => void
    handleServiceProviderEventDeletion: (service_provider_event_id?: string, maintenance_report_id?: string) => void
    handlePartPurchaseEventDeletion: (part_purchase_event_id?: string, maintenance_report_id?: string) => void
    handlePartPurchaseEventEdition: (part_purchase_event_id?: string, maintenance_report_id?: string) => void
}

const MaintenanceReportCard = ({
                                   handleMaintenanceReportEdition,
                                   handleMaintenanceReportDeletion,
                                   maintenanceReport,
                                   handleCollapse,
                                   expanded,
                                   handleServiceProviderEventEdition,
                                   handleServiceProviderEventDeletion,
                                   handlePartPurchaseEventDeletion,
                                   handlePartPurchaseEventEdition,
                               }: MaintenanceReportCardProps) => {
    const {
        id,
        maintenance_type,
        start_date,
        end_date,
        mileage,
        description,
        part_purchase_events,
        service_provider_events,
        vehicle_details,
        total_cost,
    } = maintenanceReport;
    return (
        <View>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <View className={"absolute right-0 top-0 flex flex-col z-10"}>
                        <Pressable onPress={() => handleCollapse(id)}
                                   className={"p-2"}
                                   accessibilityLabel={"Collapse"}>
                            <Animated.View style={{transform: [{rotate: expanded ? "90deg" : "0deg"}]}}>
                                <FontAwsome name={"chevron-right"} size={25} color={"#9c27b0"}/>
                            </Animated.View>
                        </Pressable>
                        <Pressable onPress={() => handleMaintenanceReportEdition(id)} className={"p-2"}>
                            <FontAwsome name={"edit"} size={25} color={"#9c27b0"}/>
                        </Pressable>
                        <Pressable onPress={() => handleMaintenanceReportDeletion(id)} className={"p-2"}>
                            <FontAwsome name={"trash"} size={25} color={"#9c27b0"}/>
                        </Pressable>
                    </View>
                    <ListItemDetail label={"Report ID"} value={id}/>
                    <ListItemDetail label={"Vehicle Details"} value={`${vehicle_details?.make} ${vehicle_details?.model} ${vehicle_details?.year}`}/>
                    <ListItemDetail label={"Maintenance Type"} value={maintenance_type.toLowerCase()}
                                    textStyle={maintenance_type === "PREVENTIVE" ? "text-success-500" : "text-error-500"}/>
                    <ListItemDetail label={"Start date"} value={start_date}/>
                    <ListItemDetail label={"End date"} value={end_date}/>
                    <ListItemDetail label={"Mileage"} value={mileage}/>
                    <ListItemDetail label={"Total cost"} value={total_cost} />
                    <ListItemDetail label={"Description"} value={description}/>
                    {part_purchase_events.length !== 0 && expanded &&
                        <View>
                            <Divider/>
                            <View>
                                <Text className={"font-semibold text-txt text-sm"}>Part Purchase Events:</Text>
                            </View>
                            <View>
                                {part_purchase_events.map((partPurchaseEvent, idx) => {
                                    return (
                                        <PartPurchaseEventCard key={idx}
                                                               part_name={partPurchaseEvent.part_details?.name || "N/A"}
                                                               provider_name={partPurchaseEvent.provider_details?.name || "N/A"}
                                                               provider_address={partPurchaseEvent.provider_details?.address || "N/A"}
                                                               provider_phone={partPurchaseEvent.provider_details?.phone_number || "N/A"}
                                                               purchase_date={partPurchaseEvent.purchase_date}
                                                               cost={partPurchaseEvent.cost}
                                                               handlePartPurchaseEventEdition={() => handlePartPurchaseEventEdition(partPurchaseEvent.id, id)}
                                                               handlePartPurchaseEventDeletion={() => handlePartPurchaseEventDeletion(partPurchaseEvent.id, id)}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                    }
                    {service_provider_events.length !== 0 && expanded &&
                        <View>
                            <Divider/>
                            <View>
                                <Text className={"font-semibold text-txt text-sm"}>Service Provider Events:</Text>
                            </View>
                            <View>
                                {service_provider_events.map((serviceEvent, idx) => {
                                    return (
                                        <ServiceProviderEventCard key={idx}
                                                                  cost={serviceEvent.cost}
                                                                  description={serviceEvent.description}
                                                                  service_date={serviceEvent.service_date}
                                                                  service_provider_address={serviceEvent.service_provider_details?.address || "N/A"}
                                                                  service_provider_name={serviceEvent.service_provider_details?.name || "N/A"}
                                                                  service_provider_phone={serviceEvent.service_provider_details?.phone_number || "N/A"}
                                                                  service_provider_type={serviceEvent.service_provider_details?.service_type || "N/A"}
                                                                  handleServiceProviderEventDeletion={() => handleServiceProviderEventDeletion(serviceEvent.id, id)}
                                                                  handleServiceProviderEventEdition={() => handleServiceProviderEventEdition(serviceEvent.id, id)}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

export default MaintenanceReportCard;