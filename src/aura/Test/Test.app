<!--
 - Created by Ivan Basenko on 31.10.2018.
 -->

<aura:application description="Test" extends="force:slds"
                  implements=" force:appHostable,flexipage:availableForAllPageTypes,force:hasRecordId,flexipage:availableForRecordHome"
                  access="global">
    <div class="slds-grid slds-gutters">
        <div class="slds-col">
            <c:BackLog/>
        </div>
        <div class="slds-col">
            <c:Sprint/>
        </div>
    </div>
</aura:application>
