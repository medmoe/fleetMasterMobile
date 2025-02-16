import React, {useEffect, useRef} from 'react';
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import {Animated, Easing, Pressable, Text, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import Divider from "@/components/Divider";
import PartPurchaseEventCard from "@/components/cards/PartPurchaseEventCard";
import ServiceProviderEventCard from "@/components/cards/ServiceProviderEventCard";
import FontAwsome from "@expo/vector-icons/FontAwesome";

interface MaintenanceReportCardProps {
    maintenanceReport: MaintenanceReportWithStringsType
    handleCollapse: (id?: string) => void
    expanded: boolean
}

const MaintenanceReportCard = ({maintenanceReport, handleCollapse, expanded}: MaintenanceReportCardProps) => {
    const animatedHeight = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false
        }).start();
    }, [expanded]);
    // Calculate the height of the content
    const totalHeight = maintenanceReport.part_purchase_events.length * 100 + maintenanceReport.service_provider_events.length * 100;
    const contentHeight = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, totalHeight]
    })
    return (
        <Pressable onPress={() => handleCollapse(maintenanceReport.id)}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <Pressable onPress={() => handleCollapse(maintenanceReport.id)}
                               className={"absolute right-0 top-0"}
                               accessibilityLabel={"Collapse"}>
                        <Animated.View style={{transform: [{rotate: expanded ? "90deg" : "0deg"}]}}>
                            <FontAwsome name={"chevron-right"} size={25} color={"#9c27b0"}/>
                        </Animated.View>
                    </Pressable>
                    <ListItemDetail label={"Report ID"} value={maintenanceReport.id}/>
                    <ListItemDetail label={"Vehicle Details"} value={maintenanceReport.vehicle}/>
                    <ListItemDetail label={"Maintenance Type"} value={maintenanceReport.maintenance_type}/>
                    <ListItemDetail label={"Start date"} value={maintenanceReport.start_date}/>
                    <ListItemDetail label={"End date"} value={maintenanceReport.end_date}/>
                    <ListItemDetail label={"Mileage"} value={maintenanceReport.mileage}/>
                    <ListItemDetail label={"Description"} value={maintenanceReport.description}/>
                    {maintenanceReport.part_purchase_events.length !== 0 && expanded &&
                        <Animated.View style={{height: contentHeight}}>
                            <Divider/>
                            <View>
                                <Text className={"font-semibold text-txt text-sm"}>Part Purchase Events:</Text>
                            </View>
                            <View>
                                {maintenanceReport.part_purchase_events.map((partPurchaseEvent, idx) => {
                                    return (
                                        <PartPurchaseEventCard key={idx}
                                                               partPurchaseEvent={partPurchaseEvent}
                                                               onPress={() => {
                                                               }}
                                                               onLongPress={() => {
                                                               }}
                                        />
                                    )
                                })}
                            </View>
                        </Animated.View>
                    }
                    {maintenanceReport.service_provider_events.length !== 0 && expanded &&
                        <Animated.View style={{height: contentHeight}}>
                            <Divider/>
                            <View>
                                <Text className={"font-semibold text-txt text-sm"}>Service Provider Events:</Text>
                            </View>
                            <View>
                                {maintenanceReport.service_provider_events.map((serviceEvent, idx) => {
                                    return (
                                        <ServiceProviderEventCard key={idx}
                                                                  serviceProviderEvent={serviceEvent}
                                                                  onPress={() => {
                                                                  }}
                                                                  onLongPress={() => {
                                                                  }}
                                        />
                                    )
                                })}
                            </View>
                        </Animated.View>
                    }
                </View>
            </View>
        </Pressable>
    );
};

export default MaintenanceReportCard;