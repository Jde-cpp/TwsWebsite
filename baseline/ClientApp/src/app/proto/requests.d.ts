import * as $protobuf from "protobufjs";
/** Namespace Jde. */
export namespace Jde {

    /** Namespace Markets. */
    namespace Markets {

        /** Namespace Proto. */
        namespace Proto {

            /** Namespace Requests. */
            namespace Requests {

                /** Properties of a GenericRequest. */
                interface IGenericRequest {

                    /** GenericRequest Type */
                    Type?: (Jde.Markets.Proto.Requests.ERequests|null);

                    /** GenericRequest RequestId */
                    RequestId?: (number|null);
                }

                /** Represents a GenericRequest. */
                class GenericRequest implements IGenericRequest {

                    /**
                     * Constructs a new GenericRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IGenericRequest);

                    /** GenericRequest Type. */
                    public Type: Jde.Markets.Proto.Requests.ERequests;

                    /** GenericRequest RequestId. */
                    public RequestId: number;

                    /**
                     * Creates a new GenericRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GenericRequest instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IGenericRequest): Jde.Markets.Proto.Requests.GenericRequest;

                    /**
                     * Encodes the specified GenericRequest message. Does not implicitly {@link Jde.Markets.Proto.Requests.GenericRequest.verify|verify} messages.
                     * @param message GenericRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IGenericRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GenericRequest message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.GenericRequest.verify|verify} messages.
                     * @param message GenericRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IGenericRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GenericRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GenericRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.GenericRequest;

                    /**
                     * Decodes a GenericRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GenericRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.GenericRequest;

                    /**
                     * Verifies a GenericRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GenericRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GenericRequest
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.GenericRequest;

                    /**
                     * Creates a plain object from a GenericRequest message. Also converts values to other types if specified.
                     * @param message GenericRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.GenericRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GenericRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestAccountUpdates. */
                interface IRequestAccountUpdates {

                    /** RequestAccountUpdates Subscribe */
                    Subscribe?: (boolean|null);

                    /** RequestAccountUpdates AccountNumber */
                    AccountNumber?: (string|null);
                }

                /** Represents a RequestAccountUpdates. */
                class RequestAccountUpdates implements IRequestAccountUpdates {

                    /**
                     * Constructs a new RequestAccountUpdates.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestAccountUpdates);

                    /** RequestAccountUpdates Subscribe. */
                    public Subscribe: boolean;

                    /** RequestAccountUpdates AccountNumber. */
                    public AccountNumber: string;

                    /**
                     * Creates a new RequestAccountUpdates instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestAccountUpdates instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestAccountUpdates): Jde.Markets.Proto.Requests.RequestAccountUpdates;

                    /**
                     * Encodes the specified RequestAccountUpdates message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdates.verify|verify} messages.
                     * @param message RequestAccountUpdates message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestAccountUpdates, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestAccountUpdates message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdates.verify|verify} messages.
                     * @param message RequestAccountUpdates message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestAccountUpdates, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestAccountUpdates message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestAccountUpdates
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestAccountUpdates;

                    /**
                     * Decodes a RequestAccountUpdates message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestAccountUpdates
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestAccountUpdates;

                    /**
                     * Verifies a RequestAccountUpdates message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestAccountUpdates message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestAccountUpdates
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestAccountUpdates;

                    /**
                     * Creates a plain object from a RequestAccountUpdates message. Also converts values to other types if specified.
                     * @param message RequestAccountUpdates
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestAccountUpdates, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestAccountUpdates to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestAccountUpdatesMulti. */
                interface IRequestAccountUpdatesMulti {

                    /** RequestAccountUpdatesMulti RequestId */
                    RequestId?: (number|null);

                    /** RequestAccountUpdatesMulti AccountNumber */
                    AccountNumber?: (string|null);

                    /** RequestAccountUpdatesMulti ModelCode */
                    ModelCode?: (string|null);

                    /** RequestAccountUpdatesMulti LedgerAndNlv */
                    LedgerAndNlv?: (boolean|null);
                }

                /** Represents a RequestAccountUpdatesMulti. */
                class RequestAccountUpdatesMulti implements IRequestAccountUpdatesMulti {

                    /**
                     * Constructs a new RequestAccountUpdatesMulti.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti);

                    /** RequestAccountUpdatesMulti RequestId. */
                    public RequestId: number;

                    /** RequestAccountUpdatesMulti AccountNumber. */
                    public AccountNumber: string;

                    /** RequestAccountUpdatesMulti ModelCode. */
                    public ModelCode: string;

                    /** RequestAccountUpdatesMulti LedgerAndNlv. */
                    public LedgerAndNlv: boolean;

                    /**
                     * Creates a new RequestAccountUpdatesMulti instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestAccountUpdatesMulti instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti): Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti;

                    /**
                     * Encodes the specified RequestAccountUpdatesMulti message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.verify|verify} messages.
                     * @param message RequestAccountUpdatesMulti message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestAccountUpdatesMulti message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti.verify|verify} messages.
                     * @param message RequestAccountUpdatesMulti message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestAccountUpdatesMulti message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestAccountUpdatesMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti;

                    /**
                     * Decodes a RequestAccountUpdatesMulti message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestAccountUpdatesMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti;

                    /**
                     * Verifies a RequestAccountUpdatesMulti message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestAccountUpdatesMulti message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestAccountUpdatesMulti
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti;

                    /**
                     * Creates a plain object from a RequestAccountUpdatesMulti message. Also converts values to other types if specified.
                     * @param message RequestAccountUpdatesMulti
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestAccountUpdatesMulti, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestAccountUpdatesMulti to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** ETickList enum. */
                enum ETickList {
                    TickListNone = 0,
                    OptionVolume = 100,
                    OptionOpenInterest = 101,
                    AverageOptVolume = 105,
                    Impvolat = 106,
                    Climpvlt = 107,
                    Bondanalyticdata = 125,
                    MiscStats = 165,
                    CScreen = 166,
                    CreditmanMarkPrice = 221,
                    Auction = 225,
                    PlPrice = 232,
                    RTVolume = 233,
                    Inventory = 236,
                    Fundamentals = 258,
                    Ivclose = 291,
                    WideNews = 292,
                    TradeCount = 293,
                    TradeRate = 294,
                    VolumeRate = 295,
                    LastRTHTrade = 318,
                    ParticipationMonitor = 370,
                    RTTrdVolume = 375,
                    CttTickTag = 377,
                    IBRate = 381,
                    RfqTickRespTag = 384,
                    DMM = 387,
                    IssuerFundamentals = 388,
                    IBWarrantImpVolCompeteTick = 391,
                    IndexCapabilities = 405,
                    FuturesMargins = 407,
                    rthistvol = 411,
                    MonitorTickTag = 439,
                    RTCLOSE = 459,
                    BondFactorMultiplier = 460,
                    FeeandRebateRate = 499,
                    midptiv = 506,
                    hvolrt10perUnderlying = 511,
                    hvolrt30perUnderlying = 512,
                    hvolrt50perUnderlying = 513,
                    hvolrt75perUnderlying = 514,
                    hvolrt100perUnderlying = 515,
                    hvolrt150perUnderlying = 516,
                    hvolrt200perUnderlying = 517,
                    fzmidptiv = 521,
                    vsiv = 545,
                    EtfNavBidAsknavbidask = 576,
                    EtfNavLastnavlast = 577,
                    EtfNavClosenavclose = 578,
                    AverageOpeningVol = 584,
                    AverageClosingVol = 585,
                    PlPriceDelayed = 587,
                    FuturesOpenInterest = 588,
                    EMAN = 608,
                    EtfNavMischightLow = 614,
                    CreditmanSlowMarkPrice = 619,
                    EtfFrozenNavLastfznavlast = 623,
                    MonetaryClosePrice = 645,
                    Avgv1Min = 658
                }

                /** Properties of a RequestHistoricalData. */
                interface IRequestHistoricalData {

                    /** RequestHistoricalData RequestId */
                    RequestId?: (number|null);

                    /** RequestHistoricalData Contract */
                    Contract?: (Jde.Markets.Proto.IContract|null);

                    /** RequestHistoricalData Date */
                    Date?: (google.protobuf.ITimestamp|null);

                    /** RequestHistoricalData Days */
                    Days?: (number|null);

                    /** RequestHistoricalData BarSize */
                    BarSize?: (Jde.Markets.Proto.Requests.BarSize|null);

                    /** RequestHistoricalData Display */
                    Display?: (Jde.Markets.Proto.Requests.Display|null);

                    /** RequestHistoricalData UseRth */
                    UseRth?: (boolean|null);

                    /** RequestHistoricalData KeepUpToDate */
                    KeepUpToDate?: (boolean|null);
                }

                /** Represents a RequestHistoricalData. */
                class RequestHistoricalData implements IRequestHistoricalData {

                    /**
                     * Constructs a new RequestHistoricalData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestHistoricalData);

                    /** RequestHistoricalData RequestId. */
                    public RequestId: number;

                    /** RequestHistoricalData Contract. */
                    public Contract?: (Jde.Markets.Proto.IContract|null);

                    /** RequestHistoricalData Date. */
                    public Date?: (google.protobuf.ITimestamp|null);

                    /** RequestHistoricalData Days. */
                    public Days: number;

                    /** RequestHistoricalData BarSize. */
                    public BarSize: Jde.Markets.Proto.Requests.BarSize;

                    /** RequestHistoricalData Display. */
                    public Display: Jde.Markets.Proto.Requests.Display;

                    /** RequestHistoricalData UseRth. */
                    public UseRth: boolean;

                    /** RequestHistoricalData KeepUpToDate. */
                    public KeepUpToDate: boolean;

                    /**
                     * Creates a new RequestHistoricalData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestHistoricalData instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestHistoricalData): Jde.Markets.Proto.Requests.RequestHistoricalData;

                    /**
                     * Encodes the specified RequestHistoricalData message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestHistoricalData.verify|verify} messages.
                     * @param message RequestHistoricalData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestHistoricalData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestHistoricalData message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestHistoricalData.verify|verify} messages.
                     * @param message RequestHistoricalData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestHistoricalData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestHistoricalData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestHistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestHistoricalData;

                    /**
                     * Decodes a RequestHistoricalData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestHistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestHistoricalData;

                    /**
                     * Verifies a RequestHistoricalData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestHistoricalData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestHistoricalData
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestHistoricalData;

                    /**
                     * Creates a plain object from a RequestHistoricalData message. Also converts values to other types if specified.
                     * @param message RequestHistoricalData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestHistoricalData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestHistoricalData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestMrkDataSmart. */
                interface IRequestMrkDataSmart {

                    /** RequestMrkDataSmart RequestId */
                    RequestId?: (number|null);

                    /** RequestMrkDataSmart ContractId */
                    ContractId?: (number|null);

                    /** RequestMrkDataSmart TickList */
                    TickList?: (Jde.Markets.Proto.Requests.ETickList[]|null);

                    /** RequestMrkDataSmart Snapshot */
                    Snapshot?: (boolean|null);
                }

                /** Represents a RequestMrkDataSmart. */
                class RequestMrkDataSmart implements IRequestMrkDataSmart {

                    /**
                     * Constructs a new RequestMrkDataSmart.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestMrkDataSmart);

                    /** RequestMrkDataSmart RequestId. */
                    public RequestId: number;

                    /** RequestMrkDataSmart ContractId. */
                    public ContractId: number;

                    /** RequestMrkDataSmart TickList. */
                    public TickList: Jde.Markets.Proto.Requests.ETickList[];

                    /** RequestMrkDataSmart Snapshot. */
                    public Snapshot: boolean;

                    /**
                     * Creates a new RequestMrkDataSmart instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestMrkDataSmart instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestMrkDataSmart): Jde.Markets.Proto.Requests.RequestMrkDataSmart;

                    /**
                     * Encodes the specified RequestMrkDataSmart message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestMrkDataSmart.verify|verify} messages.
                     * @param message RequestMrkDataSmart message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestMrkDataSmart, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestMrkDataSmart message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestMrkDataSmart.verify|verify} messages.
                     * @param message RequestMrkDataSmart message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestMrkDataSmart, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestMrkDataSmart message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestMrkDataSmart
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestMrkDataSmart;

                    /**
                     * Decodes a RequestMrkDataSmart message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestMrkDataSmart
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestMrkDataSmart;

                    /**
                     * Verifies a RequestMrkDataSmart message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestMrkDataSmart message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestMrkDataSmart
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestMrkDataSmart;

                    /**
                     * Creates a plain object from a RequestMrkDataSmart message. Also converts values to other types if specified.
                     * @param message RequestMrkDataSmart
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestMrkDataSmart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestMrkDataSmart to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestContractDetails. */
                interface IRequestContractDetails {

                    /** RequestContractDetails RequestId */
                    RequestId?: (number|null);

                    /** RequestContractDetails Contracts */
                    Contracts?: (Jde.Markets.Proto.IContract[]|null);
                }

                /** Represents a RequestContractDetails. */
                class RequestContractDetails implements IRequestContractDetails {

                    /**
                     * Constructs a new RequestContractDetails.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestContractDetails);

                    /** RequestContractDetails RequestId. */
                    public RequestId: number;

                    /** RequestContractDetails Contracts. */
                    public Contracts: Jde.Markets.Proto.IContract[];

                    /**
                     * Creates a new RequestContractDetails instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestContractDetails instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestContractDetails): Jde.Markets.Proto.Requests.RequestContractDetails;

                    /**
                     * Encodes the specified RequestContractDetails message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestContractDetails.verify|verify} messages.
                     * @param message RequestContractDetails message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestContractDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestContractDetails message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestContractDetails.verify|verify} messages.
                     * @param message RequestContractDetails message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestContractDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestContractDetails message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestContractDetails;

                    /**
                     * Decodes a RequestContractDetails message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestContractDetails;

                    /**
                     * Verifies a RequestContractDetails message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestContractDetails message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestContractDetails
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestContractDetails;

                    /**
                     * Creates a plain object from a RequestContractDetails message. Also converts values to other types if specified.
                     * @param message RequestContractDetails
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestContractDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestContractDetails to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestOptions. */
                interface IRequestOptions {

                    /** RequestOptions RequestId */
                    RequestId?: (number|null);

                    /** RequestOptions ContractId */
                    ContractId?: (number|null);

                    /** RequestOptions IsCall */
                    IsCall?: (number|null);

                    /** RequestOptions Date */
                    Date?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a RequestOptions. */
                class RequestOptions implements IRequestOptions {

                    /**
                     * Constructs a new RequestOptions.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestOptions);

                    /** RequestOptions RequestId. */
                    public RequestId: number;

                    /** RequestOptions ContractId. */
                    public ContractId: number;

                    /** RequestOptions IsCall. */
                    public IsCall: number;

                    /** RequestOptions Date. */
                    public Date?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new RequestOptions instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestOptions instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestOptions): Jde.Markets.Proto.Requests.RequestOptions;

                    /**
                     * Encodes the specified RequestOptions message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestOptions.verify|verify} messages.
                     * @param message RequestOptions message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestOptions message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestOptions.verify|verify} messages.
                     * @param message RequestOptions message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestOptions message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestOptions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestOptions;

                    /**
                     * Decodes a RequestOptions message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestOptions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestOptions;

                    /**
                     * Verifies a RequestOptions message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestOptions message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestOptions
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestOptions;

                    /**
                     * Creates a plain object from a RequestOptions message. Also converts values to other types if specified.
                     * @param message RequestOptions
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestOptions to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a FlexExecutions. */
                interface IFlexExecutions {

                    /** FlexExecutions RequestId */
                    RequestId?: (number|null);

                    /** FlexExecutions AccountNumber */
                    AccountNumber?: (string|null);

                    /** FlexExecutions Date */
                    Date?: (number|null);
                }

                /** Represents a FlexExecutions. */
                class FlexExecutions implements IFlexExecutions {

                    /**
                     * Constructs a new FlexExecutions.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IFlexExecutions);

                    /** FlexExecutions RequestId. */
                    public RequestId: number;

                    /** FlexExecutions AccountNumber. */
                    public AccountNumber: string;

                    /** FlexExecutions Date. */
                    public Date: number;

                    /**
                     * Creates a new FlexExecutions instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns FlexExecutions instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IFlexExecutions): Jde.Markets.Proto.Requests.FlexExecutions;

                    /**
                     * Encodes the specified FlexExecutions message. Does not implicitly {@link Jde.Markets.Proto.Requests.FlexExecutions.verify|verify} messages.
                     * @param message FlexExecutions message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IFlexExecutions, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified FlexExecutions message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.FlexExecutions.verify|verify} messages.
                     * @param message FlexExecutions message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IFlexExecutions, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a FlexExecutions message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns FlexExecutions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.FlexExecutions;

                    /**
                     * Decodes a FlexExecutions message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns FlexExecutions
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.FlexExecutions;

                    /**
                     * Verifies a FlexExecutions message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a FlexExecutions message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns FlexExecutions
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.FlexExecutions;

                    /**
                     * Creates a plain object from a FlexExecutions message. Also converts values to other types if specified.
                     * @param message FlexExecutions
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.FlexExecutions, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this FlexExecutions to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestUnion. */
                interface IRequestUnion {

                    /** RequestUnion GenericRequest */
                    GenericRequest?: (Jde.Markets.Proto.Requests.IGenericRequest|null);

                    /** RequestUnion AccountUpdates */
                    AccountUpdates?: (Jde.Markets.Proto.Requests.IRequestAccountUpdates|null);

                    /** RequestUnion AccountUpdatesMulti */
                    AccountUpdatesMulti?: (Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti|null);

                    /** RequestUnion MrkDataSmart */
                    MrkDataSmart?: (Jde.Markets.Proto.Requests.IRequestMrkDataSmart|null);

                    /** RequestUnion ContractDetails */
                    ContractDetails?: (Jde.Markets.Proto.Requests.IRequestContractDetails|null);

                    /** RequestUnion Options */
                    Options?: (Jde.Markets.Proto.Requests.IRequestOptions|null);

                    /** RequestUnion HistoricalData */
                    HistoricalData?: (Jde.Markets.Proto.Requests.IRequestHistoricalData|null);

                    /** RequestUnion FlexExecutions */
                    FlexExecutions?: (Jde.Markets.Proto.Requests.IFlexExecutions|null);
                }

                /** Represents a RequestUnion. */
                class RequestUnion implements IRequestUnion {

                    /**
                     * Constructs a new RequestUnion.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestUnion);

                    /** RequestUnion GenericRequest. */
                    public GenericRequest?: (Jde.Markets.Proto.Requests.IGenericRequest|null);

                    /** RequestUnion AccountUpdates. */
                    public AccountUpdates?: (Jde.Markets.Proto.Requests.IRequestAccountUpdates|null);

                    /** RequestUnion AccountUpdatesMulti. */
                    public AccountUpdatesMulti?: (Jde.Markets.Proto.Requests.IRequestAccountUpdatesMulti|null);

                    /** RequestUnion MrkDataSmart. */
                    public MrkDataSmart?: (Jde.Markets.Proto.Requests.IRequestMrkDataSmart|null);

                    /** RequestUnion ContractDetails. */
                    public ContractDetails?: (Jde.Markets.Proto.Requests.IRequestContractDetails|null);

                    /** RequestUnion Options. */
                    public Options?: (Jde.Markets.Proto.Requests.IRequestOptions|null);

                    /** RequestUnion HistoricalData. */
                    public HistoricalData?: (Jde.Markets.Proto.Requests.IRequestHistoricalData|null);

                    /** RequestUnion FlexExecutions. */
                    public FlexExecutions?: (Jde.Markets.Proto.Requests.IFlexExecutions|null);

                    /** RequestUnion Value. */
                    public Value?: ("GenericRequest"|"AccountUpdates"|"AccountUpdatesMulti"|"MrkDataSmart"|"ContractDetails"|"Options"|"HistoricalData"|"FlexExecutions");

                    /**
                     * Creates a new RequestUnion instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestUnion instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestUnion): Jde.Markets.Proto.Requests.RequestUnion;

                    /**
                     * Encodes the specified RequestUnion message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestUnion.verify|verify} messages.
                     * @param message RequestUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestUnion message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestUnion.verify|verify} messages.
                     * @param message RequestUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestUnion message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestUnion;

                    /**
                     * Decodes a RequestUnion message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestUnion;

                    /**
                     * Verifies a RequestUnion message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestUnion message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestUnion
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestUnion;

                    /**
                     * Creates a plain object from a RequestUnion message. Also converts values to other types if specified.
                     * @param message RequestUnion
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestUnion, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestUnion to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestTransmission. */
                interface IRequestTransmission {

                    /** RequestTransmission Messages */
                    Messages?: (Jde.Markets.Proto.Requests.IRequestUnion[]|null);
                }

                /** Represents a RequestTransmission. */
                class RequestTransmission implements IRequestTransmission {

                    /**
                     * Constructs a new RequestTransmission.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Requests.IRequestTransmission);

                    /** RequestTransmission Messages. */
                    public Messages: Jde.Markets.Proto.Requests.IRequestUnion[];

                    /**
                     * Creates a new RequestTransmission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestTransmission instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Requests.IRequestTransmission): Jde.Markets.Proto.Requests.RequestTransmission;

                    /**
                     * Encodes the specified RequestTransmission message. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestTransmission.verify|verify} messages.
                     * @param message RequestTransmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Requests.IRequestTransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestTransmission message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Requests.RequestTransmission.verify|verify} messages.
                     * @param message RequestTransmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Requests.IRequestTransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestTransmission message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestTransmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Requests.RequestTransmission;

                    /**
                     * Decodes a RequestTransmission message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestTransmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Requests.RequestTransmission;

                    /**
                     * Verifies a RequestTransmission message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestTransmission message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestTransmission
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Requests.RequestTransmission;

                    /**
                     * Creates a plain object from a RequestTransmission message. Also converts values to other types if specified.
                     * @param message RequestTransmission
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Requests.RequestTransmission, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestTransmission to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Display enum. */
                enum Display {
                    Trades = 0,
                    Midpoint = 1,
                    Bid = 3,
                    Ask = 4,
                    BidAsk = 5,
                    HistoricalVolatility = 6,
                    OptionImpliedVolatility = 7,
                    FeeRate = 8,
                    RebateRate = 9
                }

                /** BarSize enum. */
                enum BarSize {
                    None = 0,
                    Second = 1,
                    Second5 = 2,
                    Second15 = 3,
                    Second30 = 4,
                    Minute = 5,
                    Minute2 = 6,
                    Minute3 = 16,
                    Minute5 = 7,
                    Minute15 = 8,
                    Minute30 = 9,
                    Hour = 10,
                    Day = 11,
                    Week = 12,
                    Month = 13,
                    Month3 = 14,
                    Year = 15
                }

                /** ERequests enum. */
                enum ERequests {
                    Ping = 0,
                    MarketData = 1,
                    CANCEL_MKT_DATA = 2,
                    PlaceOrder = 3,
                    CancelOrder = 4,
                    REQ_OPEN_ORDERS = 5,
                    REQ_ACCT_DATA = 6,
                    REQ_EXECUTIONS = 7,
                    RequestIds = 8,
                    REQ_CONTRACT_DATA = 9,
                    REQ_MKT_DEPTH = 10,
                    CANCEL_MKT_DEPTH = 11,
                    REQ_NEWS_BULLETINS = 12,
                    CANCEL_NEWS_BULLETINS = 13,
                    SET_SERVER_LOGLEVEL = 14,
                    REQ_AUTO_OPEN_ORDERS = 15,
                    REQ_ALL_OPEN_ORDERS = 16,
                    ManagedAccounts = 17,
                    REQ_FA = 18,
                    REPLACE_FA = 19,
                    REQ_HISTORICAL_DATA = 20,
                    EXERCISE_OPTIONS = 21,
                    REQ_SCANNER_SUBSCRIPTION = 22,
                    CANCEL_SCANNER_SUBSCRIPTION = 23,
                    REQ_SCANNER_PARAMETERS = 24,
                    CANCEL_HISTORICAL_DATA = 25,
                    CurrentTime = 49,
                    RequestRealTimeBars = 50,
                    CANCEL_REAL_TIME_BARS = 51,
                    REQ_FUNDAMENTAL_DATA = 52,
                    CANCEL_FUNDAMENTAL_DATA = 53,
                    REQ_CALC_IMPLIED_VOLAT = 54,
                    REQ_CALC_OPTION_PRICE = 55,
                    CANCEL_CALC_IMPLIED_VOLAT = 56,
                    CANCEL_CALC_OPTION_PRICE = 57,
                    REQ_GLOBAL_CANCEL = 58,
                    REQ_MARKET_DATA_TYPE = 59,
                    Positions = 61,
                    REQ_ACCOUNT_SUMMARY = 62,
                    CANCEL_ACCOUNT_SUMMARY = 63,
                    CANCEL_POSITIONS = 64,
                    VERIFY_REQUEST = 65,
                    VERIFY_MESSAGE = 66,
                    QUERY_DISPLAY_GROUPS = 67,
                    SUBSCRIBE_TO_GROUP_EVENTS = 68,
                    UPDATE_DISPLAY_GROUP = 69,
                    UNSUBSCRIBE_FROM_GROUP_EVENTS = 70,
                    StartApi = 71,
                    VERIFY_AND_AUTH_REQUEST = 72,
                    VERIFY_AND_AUTH_MESSAGE = 73,
                    REQ_POSITIONS_MULTI = 74,
                    CANCEL_POSITIONS_MULTI = 75,
                    RequestAccountUpdatesMulti_ = 76,
                    CANCEL_ACCOUNT_UPDATES_MULTI = 77,
                    REQ_SEC_DEF_OPT_PARAMS = 78,
                    REQ_SOFT_DOLLAR_TIERS = 79,
                    REQ_FAMILY_CODES = 80,
                    REQ_MATCHING_SYMBOLS = 81,
                    REQ_MKT_DEPTH_EXCHANGES = 82,
                    REQ_SMART_COMPONENTS = 83,
                    REQ_NEWS_ARTICLE = 84,
                    REQ_NEWS_PROVIDERS = 85,
                    REQ_HISTORICAL_NEWS = 86,
                    REQ_HEAD_TIMESTAMP = 87,
                    REQ_HISTOGRAM_DATA = 88,
                    CANCEL_HISTOGRAM_DATA = 89,
                    CANCEL_HEAD_TIMESTAMP = 90,
                    REQ_MARKET_RULE = 91,
                    REQ_PNL = 92,
                    CANCEL_PNL = 93,
                    REQ_PNL_SINGLE = 94,
                    CANCEL_PNL_SINGLE = 95,
                    REQ_HISTORICAL_TICKS = 96,
                    REQ_TICK_BY_TICK_DATA = 97,
                    CANCEL_TICK_BY_TICK_DATA = 98
                }
            }

            /** Properties of a ComboLeg. */
            interface IComboLeg {

                /** ComboLeg ConId */
                ConId?: (number|null);

                /** ComboLeg Ratio */
                Ratio?: (number|null);

                /** ComboLeg Action */
                Action?: (string|null);

                /** ComboLeg Exchange */
                Exchange?: (string|null);

                /** ComboLeg OpenClose */
                OpenClose?: (number|null);

                /** ComboLeg ShortSaleSlot */
                ShortSaleSlot?: (number|null);

                /** ComboLeg DesignatedLocation */
                DesignatedLocation?: (string|null);

                /** ComboLeg ExemptCode */
                ExemptCode?: (number|null);
            }

            /** Represents a ComboLeg. */
            class ComboLeg implements IComboLeg {

                /**
                 * Constructs a new ComboLeg.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Jde.Markets.Proto.IComboLeg);

                /** ComboLeg ConId. */
                public ConId: number;

                /** ComboLeg Ratio. */
                public Ratio: number;

                /** ComboLeg Action. */
                public Action: string;

                /** ComboLeg Exchange. */
                public Exchange: string;

                /** ComboLeg OpenClose. */
                public OpenClose: number;

                /** ComboLeg ShortSaleSlot. */
                public ShortSaleSlot: number;

                /** ComboLeg DesignatedLocation. */
                public DesignatedLocation: string;

                /** ComboLeg ExemptCode. */
                public ExemptCode: number;

                /**
                 * Creates a new ComboLeg instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ComboLeg instance
                 */
                public static create(properties?: Jde.Markets.Proto.IComboLeg): Jde.Markets.Proto.ComboLeg;

                /**
                 * Encodes the specified ComboLeg message. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @param message ComboLeg message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: Jde.Markets.Proto.IComboLeg, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ComboLeg message, length delimited. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @param message ComboLeg message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: Jde.Markets.Proto.IComboLeg, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.ComboLeg;

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.ComboLeg;

                /**
                 * Verifies a ComboLeg message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ComboLeg message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ComboLeg
                 */
                public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.ComboLeg;

                /**
                 * Creates a plain object from a ComboLeg message. Also converts values to other types if specified.
                 * @param message ComboLeg
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Jde.Markets.Proto.ComboLeg, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ComboLeg to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DeltaNeutralContract. */
            interface IDeltaNeutralContract {

                /** DeltaNeutralContract Id */
                Id?: (number|null);

                /** DeltaNeutralContract Delta */
                Delta?: (number|null);

                /** DeltaNeutralContract Price */
                Price?: (number|null);
            }

            /** Represents a DeltaNeutralContract. */
            class DeltaNeutralContract implements IDeltaNeutralContract {

                /**
                 * Constructs a new DeltaNeutralContract.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Jde.Markets.Proto.IDeltaNeutralContract);

                /** DeltaNeutralContract Id. */
                public Id: number;

                /** DeltaNeutralContract Delta. */
                public Delta: number;

                /** DeltaNeutralContract Price. */
                public Price: number;

                /**
                 * Creates a new DeltaNeutralContract instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeltaNeutralContract instance
                 */
                public static create(properties?: Jde.Markets.Proto.IDeltaNeutralContract): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Encodes the specified DeltaNeutralContract message. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @param message DeltaNeutralContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: Jde.Markets.Proto.IDeltaNeutralContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeltaNeutralContract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @param message DeltaNeutralContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: Jde.Markets.Proto.IDeltaNeutralContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Verifies a DeltaNeutralContract message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeltaNeutralContract message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeltaNeutralContract
                 */
                public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Creates a plain object from a DeltaNeutralContract message. Also converts values to other types if specified.
                 * @param message DeltaNeutralContract
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Jde.Markets.Proto.DeltaNeutralContract, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeltaNeutralContract to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Contract. */
            interface IContract {

                /** Contract Id */
                Id?: (number|null);

                /** Contract Symbol */
                Symbol?: (string|null);

                /** Contract SecType */
                SecType?: (string|null);

                /** Contract LastTradeDateOrContractMonth */
                LastTradeDateOrContractMonth?: (string|null);

                /** Contract Strike */
                Strike?: (number|null);

                /** Contract Right */
                Right?: (string|null);

                /** Contract Multiplier */
                Multiplier?: (string|null);

                /** Contract Exchange */
                Exchange?: (string|null);

                /** Contract PrimaryExchange */
                PrimaryExchange?: (string|null);

                /** Contract Currency */
                Currency?: (string|null);

                /** Contract LocalSymbol */
                LocalSymbol?: (string|null);

                /** Contract TradingClass */
                TradingClass?: (string|null);

                /** Contract IncludeExpired */
                IncludeExpired?: (boolean|null);

                /** Contract SecIdType */
                SecIdType?: (string|null);

                /** Contract SecId */
                SecId?: (string|null);

                /** Contract ComboLegsDescrip */
                ComboLegsDescrip?: (string|null);

                /** Contract ComboLegs */
                ComboLegs?: (Jde.Markets.Proto.IComboLeg[]|null);

                /** Contract DeltaNeutral */
                DeltaNeutral?: (Jde.Markets.Proto.IDeltaNeutralContract|null);

                /** Contract Name */
                Name?: (string|null);

                /** Contract Flags */
                Flags?: (number|null);
            }

            /** Represents a Contract. */
            class Contract implements IContract {

                /**
                 * Constructs a new Contract.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Jde.Markets.Proto.IContract);

                /** Contract Id. */
                public Id: number;

                /** Contract Symbol. */
                public Symbol: string;

                /** Contract SecType. */
                public SecType: string;

                /** Contract LastTradeDateOrContractMonth. */
                public LastTradeDateOrContractMonth: string;

                /** Contract Strike. */
                public Strike: number;

                /** Contract Right. */
                public Right: string;

                /** Contract Multiplier. */
                public Multiplier: string;

                /** Contract Exchange. */
                public Exchange: string;

                /** Contract PrimaryExchange. */
                public PrimaryExchange: string;

                /** Contract Currency. */
                public Currency: string;

                /** Contract LocalSymbol. */
                public LocalSymbol: string;

                /** Contract TradingClass. */
                public TradingClass: string;

                /** Contract IncludeExpired. */
                public IncludeExpired: boolean;

                /** Contract SecIdType. */
                public SecIdType: string;

                /** Contract SecId. */
                public SecId: string;

                /** Contract ComboLegsDescrip. */
                public ComboLegsDescrip: string;

                /** Contract ComboLegs. */
                public ComboLegs: Jde.Markets.Proto.IComboLeg[];

                /** Contract DeltaNeutral. */
                public DeltaNeutral?: (Jde.Markets.Proto.IDeltaNeutralContract|null);

                /** Contract Name. */
                public Name: string;

                /** Contract Flags. */
                public Flags: number;

                /**
                 * Creates a new Contract instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Contract instance
                 */
                public static create(properties?: Jde.Markets.Proto.IContract): Jde.Markets.Proto.Contract;

                /**
                 * Encodes the specified Contract message. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @param message Contract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: Jde.Markets.Proto.IContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Contract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @param message Contract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: Jde.Markets.Proto.IContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Contract message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Contract;

                /**
                 * Decodes a Contract message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Contract;

                /**
                 * Verifies a Contract message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Contract message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Contract
                 */
                public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Contract;

                /**
                 * Creates a plain object from a Contract message. Also converts values to other types if specified.
                 * @param message Contract
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Jde.Markets.Proto.Contract, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Contract to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
