import * as $protobuf from "protobufjs";
/** Namespace Jde. */
export namespace Jde {

    /** Namespace Markets. */
    namespace Markets {

        /** Namespace Proto. */
        namespace Proto {

            /** Namespace Results. */
            namespace Results {

                /** Properties of a MessageValue. */
                interface IMessageValue {

                    /** MessageValue Type */
                    Type?: (Jde.Markets.Proto.Results.EResults|null);

                    /** MessageValue StringValue */
                    StringValue?: (string|null);

                    /** MessageValue IntValue */
                    IntValue?: (number|null);
                }

                /** Represents a MessageValue. */
                class MessageValue implements IMessageValue {

                    /**
                     * Constructs a new MessageValue.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IMessageValue);

                    /** MessageValue Type. */
                    public Type: Jde.Markets.Proto.Results.EResults;

                    /** MessageValue StringValue. */
                    public StringValue: string;

                    /** MessageValue IntValue. */
                    public IntValue: number;

                    /** MessageValue Value. */
                    public Value?: ("StringValue"|"IntValue");

                    /**
                     * Creates a new MessageValue instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MessageValue instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IMessageValue): Jde.Markets.Proto.Results.MessageValue;

                    /**
                     * Encodes the specified MessageValue message. Does not implicitly {@link Jde.Markets.Proto.Results.MessageValue.verify|verify} messages.
                     * @param message MessageValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IMessageValue, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MessageValue message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.MessageValue.verify|verify} messages.
                     * @param message MessageValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IMessageValue, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MessageValue message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MessageValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.MessageValue;

                    /**
                     * Decodes a MessageValue message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MessageValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.MessageValue;

                    /**
                     * Verifies a MessageValue message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MessageValue message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MessageValue
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.MessageValue;

                    /**
                     * Creates a plain object from a MessageValue message. Also converts values to other types if specified.
                     * @param message MessageValue
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.MessageValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MessageValue to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a StringResult. */
                interface IStringResult {

                    /** StringResult Type */
                    Type?: (Jde.Markets.Proto.Results.EResults|null);

                    /** StringResult RequestId */
                    RequestId?: (number|null);

                    /** StringResult Value */
                    Value?: (string|null);
                }

                /** Represents a StringResult. */
                class StringResult implements IStringResult {

                    /**
                     * Constructs a new StringResult.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IStringResult);

                    /** StringResult Type. */
                    public Type: Jde.Markets.Proto.Results.EResults;

                    /** StringResult RequestId. */
                    public RequestId: number;

                    /** StringResult Value. */
                    public Value: string;

                    /**
                     * Creates a new StringResult instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns StringResult instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IStringResult): Jde.Markets.Proto.Results.StringResult;

                    /**
                     * Encodes the specified StringResult message. Does not implicitly {@link Jde.Markets.Proto.Results.StringResult.verify|verify} messages.
                     * @param message StringResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IStringResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified StringResult message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.StringResult.verify|verify} messages.
                     * @param message StringResult message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IStringResult, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a StringResult message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns StringResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.StringResult;

                    /**
                     * Decodes a StringResult message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns StringResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.StringResult;

                    /**
                     * Verifies a StringResult message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a StringResult message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns StringResult
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.StringResult;

                    /**
                     * Creates a plain object from a StringResult message. Also converts values to other types if specified.
                     * @param message StringResult
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.StringResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this StringResult to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TagValue. */
                interface ITagValue {

                    /** TagValue Tag */
                    Tag?: (string|null);

                    /** TagValue Value */
                    Value?: (string|null);
                }

                /** Represents a TagValue. */
                class TagValue implements ITagValue {

                    /**
                     * Constructs a new TagValue.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITagValue);

                    /** TagValue Tag. */
                    public Tag: string;

                    /** TagValue Value. */
                    public Value: string;

                    /**
                     * Creates a new TagValue instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TagValue instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITagValue): Jde.Markets.Proto.Results.TagValue;

                    /**
                     * Encodes the specified TagValue message. Does not implicitly {@link Jde.Markets.Proto.Results.TagValue.verify|verify} messages.
                     * @param message TagValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITagValue, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TagValue message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TagValue.verify|verify} messages.
                     * @param message TagValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITagValue, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TagValue message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TagValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.TagValue;

                    /**
                     * Decodes a TagValue message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TagValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.TagValue;

                    /**
                     * Verifies a TagValue message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TagValue message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TagValue
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.TagValue;

                    /**
                     * Creates a plain object from a TagValue message. Also converts values to other types if specified.
                     * @param message TagValue
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.TagValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TagValue to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ContractDetails. */
                interface IContractDetails {

                    /** ContractDetails RequestId */
                    RequestId?: (number|null);

                    /** ContractDetails Contract */
                    Contract?: (Jde.Markets.Proto.IContract|null);

                    /** ContractDetails MarketName */
                    MarketName?: (string|null);

                    /** ContractDetails MinTick */
                    MinTick?: (number|null);

                    /** ContractDetails OrderTypes */
                    OrderTypes?: (string|null);

                    /** ContractDetails ValidExchanges */
                    ValidExchanges?: (string|null);

                    /** ContractDetails PriceMagnifier */
                    PriceMagnifier?: (number|Long|null);

                    /** ContractDetails UnderConId */
                    UnderConId?: (number|null);

                    /** ContractDetails LongName */
                    LongName?: (string|null);

                    /** ContractDetails ContractMonth */
                    ContractMonth?: (string|null);

                    /** ContractDetails Industry */
                    Industry?: (string|null);

                    /** ContractDetails Category */
                    Category?: (string|null);

                    /** ContractDetails Subcategory */
                    Subcategory?: (string|null);

                    /** ContractDetails TimeZoneId */
                    TimeZoneId?: (string|null);

                    /** ContractDetails TradingHours */
                    TradingHours?: (string|null);

                    /** ContractDetails LiquidHours */
                    LiquidHours?: (string|null);

                    /** ContractDetails EvRule */
                    EvRule?: (string|null);

                    /** ContractDetails EvMultiplier */
                    EvMultiplier?: (number|null);

                    /** ContractDetails MdSizeMultiplier */
                    MdSizeMultiplier?: (number|null);

                    /** ContractDetails AggGroup */
                    AggGroup?: (number|null);

                    /** ContractDetails UnderSymbol */
                    UnderSymbol?: (string|null);

                    /** ContractDetails UnderSecType */
                    UnderSecType?: (string|null);

                    /** ContractDetails MarketRuleIds */
                    MarketRuleIds?: (string|null);

                    /** ContractDetails RealExpirationDate */
                    RealExpirationDate?: (string|null);

                    /** ContractDetails LastTradeTime */
                    LastTradeTime?: (string|null);

                    /** ContractDetails secIdList */
                    secIdList?: (Jde.Markets.Proto.Results.ITagValue[]|null);

                    /** ContractDetails Cusip */
                    Cusip?: (string|null);

                    /** ContractDetails Ratings */
                    Ratings?: (string|null);

                    /** ContractDetails DescAppend */
                    DescAppend?: (string|null);

                    /** ContractDetails BondType */
                    BondType?: (string|null);

                    /** ContractDetails CouponType */
                    CouponType?: (string|null);

                    /** ContractDetails Callable */
                    Callable?: (boolean|null);

                    /** ContractDetails Putable */
                    Putable?: (boolean|null);

                    /** ContractDetails Coupon */
                    Coupon?: (number|null);

                    /** ContractDetails Convertible */
                    Convertible?: (boolean|null);

                    /** ContractDetails Maturity */
                    Maturity?: (string|null);

                    /** ContractDetails IssueDate */
                    IssueDate?: (string|null);

                    /** ContractDetails NextOptionDate */
                    NextOptionDate?: (string|null);

                    /** ContractDetails NextOptionType */
                    NextOptionType?: (string|null);

                    /** ContractDetails NextOptionPartial */
                    NextOptionPartial?: (boolean|null);

                    /** ContractDetails Notes */
                    Notes?: (string|null);
                }

                /** Represents a ContractDetails. */
                class ContractDetails implements IContractDetails {

                    /**
                     * Constructs a new ContractDetails.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IContractDetails);

                    /** ContractDetails RequestId. */
                    public RequestId: number;

                    /** ContractDetails Contract. */
                    public Contract?: (Jde.Markets.Proto.IContract|null);

                    /** ContractDetails MarketName. */
                    public MarketName: string;

                    /** ContractDetails MinTick. */
                    public MinTick: number;

                    /** ContractDetails OrderTypes. */
                    public OrderTypes: string;

                    /** ContractDetails ValidExchanges. */
                    public ValidExchanges: string;

                    /** ContractDetails PriceMagnifier. */
                    public PriceMagnifier: (number|Long);

                    /** ContractDetails UnderConId. */
                    public UnderConId: number;

                    /** ContractDetails LongName. */
                    public LongName: string;

                    /** ContractDetails ContractMonth. */
                    public ContractMonth: string;

                    /** ContractDetails Industry. */
                    public Industry: string;

                    /** ContractDetails Category. */
                    public Category: string;

                    /** ContractDetails Subcategory. */
                    public Subcategory: string;

                    /** ContractDetails TimeZoneId. */
                    public TimeZoneId: string;

                    /** ContractDetails TradingHours. */
                    public TradingHours: string;

                    /** ContractDetails LiquidHours. */
                    public LiquidHours: string;

                    /** ContractDetails EvRule. */
                    public EvRule: string;

                    /** ContractDetails EvMultiplier. */
                    public EvMultiplier: number;

                    /** ContractDetails MdSizeMultiplier. */
                    public MdSizeMultiplier: number;

                    /** ContractDetails AggGroup. */
                    public AggGroup: number;

                    /** ContractDetails UnderSymbol. */
                    public UnderSymbol: string;

                    /** ContractDetails UnderSecType. */
                    public UnderSecType: string;

                    /** ContractDetails MarketRuleIds. */
                    public MarketRuleIds: string;

                    /** ContractDetails RealExpirationDate. */
                    public RealExpirationDate: string;

                    /** ContractDetails LastTradeTime. */
                    public LastTradeTime: string;

                    /** ContractDetails secIdList. */
                    public secIdList: Jde.Markets.Proto.Results.ITagValue[];

                    /** ContractDetails Cusip. */
                    public Cusip: string;

                    /** ContractDetails Ratings. */
                    public Ratings: string;

                    /** ContractDetails DescAppend. */
                    public DescAppend: string;

                    /** ContractDetails BondType. */
                    public BondType: string;

                    /** ContractDetails CouponType. */
                    public CouponType: string;

                    /** ContractDetails Callable. */
                    public Callable: boolean;

                    /** ContractDetails Putable. */
                    public Putable: boolean;

                    /** ContractDetails Coupon. */
                    public Coupon: number;

                    /** ContractDetails Convertible. */
                    public Convertible: boolean;

                    /** ContractDetails Maturity. */
                    public Maturity: string;

                    /** ContractDetails IssueDate. */
                    public IssueDate: string;

                    /** ContractDetails NextOptionDate. */
                    public NextOptionDate: string;

                    /** ContractDetails NextOptionType. */
                    public NextOptionType: string;

                    /** ContractDetails NextOptionPartial. */
                    public NextOptionPartial: boolean;

                    /** ContractDetails Notes. */
                    public Notes: string;

                    /**
                     * Creates a new ContractDetails instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ContractDetails instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IContractDetails): Jde.Markets.Proto.Results.ContractDetails;

                    /**
                     * Encodes the specified ContractDetails message. Does not implicitly {@link Jde.Markets.Proto.Results.ContractDetails.verify|verify} messages.
                     * @param message ContractDetails message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IContractDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ContractDetails message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.ContractDetails.verify|verify} messages.
                     * @param message ContractDetails message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IContractDetails, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ContractDetails message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.ContractDetails;

                    /**
                     * Decodes a ContractDetails message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ContractDetails
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.ContractDetails;

                    /**
                     * Verifies a ContractDetails message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ContractDetails message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ContractDetails
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.ContractDetails;

                    /**
                     * Creates a plain object from a ContractDetails message. Also converts values to other types if specified.
                     * @param message ContractDetails
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.ContractDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ContractDetails to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Position. */
                interface IPosition {

                    /** Position AccountNumber */
                    AccountNumber?: (string|null);

                    /** Position Contract */
                    Contract?: (Jde.Markets.Proto.IContract|null);

                    /** Position Size */
                    Size?: (number|null);

                    /** Position AvgCost */
                    AvgCost?: (number|null);
                }

                /** Represents a Position. */
                class Position implements IPosition {

                    /**
                     * Constructs a new Position.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IPosition);

                    /** Position AccountNumber. */
                    public AccountNumber: string;

                    /** Position Contract. */
                    public Contract?: (Jde.Markets.Proto.IContract|null);

                    /** Position Size. */
                    public Size: number;

                    /** Position AvgCost. */
                    public AvgCost: number;

                    /**
                     * Creates a new Position instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Position instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IPosition): Jde.Markets.Proto.Results.Position;

                    /**
                     * Encodes the specified Position message. Does not implicitly {@link Jde.Markets.Proto.Results.Position.verify|verify} messages.
                     * @param message Position message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IPosition, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Position message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Position.verify|verify} messages.
                     * @param message Position message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IPosition, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Position message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Position
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Position;

                    /**
                     * Decodes a Position message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Position
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Position;

                    /**
                     * Verifies a Position message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Position message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Position
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Position;

                    /**
                     * Creates a plain object from a Position message. Also converts values to other types if specified.
                     * @param message Position
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Position, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Position to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an AccountList. */
                interface IAccountList {

                    /** AccountList Numbers */
                    Numbers?: (string[]|null);
                }

                /** Represents an AccountList. */
                class AccountList implements IAccountList {

                    /**
                     * Constructs a new AccountList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IAccountList);

                    /** AccountList Numbers. */
                    public Numbers: string[];

                    /**
                     * Creates a new AccountList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AccountList instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IAccountList): Jde.Markets.Proto.Results.AccountList;

                    /**
                     * Encodes the specified AccountList message. Does not implicitly {@link Jde.Markets.Proto.Results.AccountList.verify|verify} messages.
                     * @param message AccountList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IAccountList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AccountList message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.AccountList.verify|verify} messages.
                     * @param message AccountList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IAccountList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AccountList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AccountList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.AccountList;

                    /**
                     * Decodes an AccountList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AccountList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.AccountList;

                    /**
                     * Verifies an AccountList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AccountList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AccountList
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.AccountList;

                    /**
                     * Creates a plain object from an AccountList message. Also converts values to other types if specified.
                     * @param message AccountList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.AccountList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AccountList to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an AccountUpdate. */
                interface IAccountUpdate {

                    /** AccountUpdate Account */
                    Account?: (string|null);

                    /** AccountUpdate Key */
                    Key?: (string|null);

                    /** AccountUpdate Value */
                    Value?: (string|null);

                    /** AccountUpdate Currency */
                    Currency?: (string|null);
                }

                /** Represents an AccountUpdate. */
                class AccountUpdate implements IAccountUpdate {

                    /**
                     * Constructs a new AccountUpdate.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IAccountUpdate);

                    /** AccountUpdate Account. */
                    public Account: string;

                    /** AccountUpdate Key. */
                    public Key: string;

                    /** AccountUpdate Value. */
                    public Value: string;

                    /** AccountUpdate Currency. */
                    public Currency: string;

                    /**
                     * Creates a new AccountUpdate instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AccountUpdate instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IAccountUpdate): Jde.Markets.Proto.Results.AccountUpdate;

                    /**
                     * Encodes the specified AccountUpdate message. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdate.verify|verify} messages.
                     * @param message AccountUpdate message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IAccountUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AccountUpdate message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdate.verify|verify} messages.
                     * @param message AccountUpdate message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IAccountUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AccountUpdate message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AccountUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.AccountUpdate;

                    /**
                     * Decodes an AccountUpdate message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AccountUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.AccountUpdate;

                    /**
                     * Verifies an AccountUpdate message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AccountUpdate message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AccountUpdate
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.AccountUpdate;

                    /**
                     * Creates a plain object from an AccountUpdate message. Also converts values to other types if specified.
                     * @param message AccountUpdate
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.AccountUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AccountUpdate to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an AccountUpdateMulti. */
                interface IAccountUpdateMulti {

                    /** AccountUpdateMulti RequestId */
                    RequestId?: (number|null);

                    /** AccountUpdateMulti Account */
                    Account?: (string|null);

                    /** AccountUpdateMulti ModelCode */
                    ModelCode?: (string|null);

                    /** AccountUpdateMulti Key */
                    Key?: (string|null);

                    /** AccountUpdateMulti Value */
                    Value?: (string|null);

                    /** AccountUpdateMulti Currency */
                    Currency?: (string|null);
                }

                /** Represents an AccountUpdateMulti. */
                class AccountUpdateMulti implements IAccountUpdateMulti {

                    /**
                     * Constructs a new AccountUpdateMulti.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IAccountUpdateMulti);

                    /** AccountUpdateMulti RequestId. */
                    public RequestId: number;

                    /** AccountUpdateMulti Account. */
                    public Account: string;

                    /** AccountUpdateMulti ModelCode. */
                    public ModelCode: string;

                    /** AccountUpdateMulti Key. */
                    public Key: string;

                    /** AccountUpdateMulti Value. */
                    public Value: string;

                    /** AccountUpdateMulti Currency. */
                    public Currency: string;

                    /**
                     * Creates a new AccountUpdateMulti instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AccountUpdateMulti instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IAccountUpdateMulti): Jde.Markets.Proto.Results.AccountUpdateMulti;

                    /**
                     * Encodes the specified AccountUpdateMulti message. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdateMulti.verify|verify} messages.
                     * @param message AccountUpdateMulti message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IAccountUpdateMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AccountUpdateMulti message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.AccountUpdateMulti.verify|verify} messages.
                     * @param message AccountUpdateMulti message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IAccountUpdateMulti, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AccountUpdateMulti message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AccountUpdateMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.AccountUpdateMulti;

                    /**
                     * Decodes an AccountUpdateMulti message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AccountUpdateMulti
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.AccountUpdateMulti;

                    /**
                     * Verifies an AccountUpdateMulti message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AccountUpdateMulti message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AccountUpdateMulti
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.AccountUpdateMulti;

                    /**
                     * Creates a plain object from an AccountUpdateMulti message. Also converts values to other types if specified.
                     * @param message AccountUpdateMulti
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.AccountUpdateMulti, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AccountUpdateMulti to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Bar. */
                interface IBar {

                    /** Bar Time */
                    Time?: (google.protobuf.ITimestamp|null);

                    /** Bar High */
                    High?: (number|null);

                    /** Bar Low */
                    Low?: (number|null);

                    /** Bar Open */
                    Open?: (number|null);

                    /** Bar Close */
                    Close?: (number|null);

                    /** Bar Wap */
                    Wap?: (number|null);

                    /** Bar Volume */
                    Volume?: (number|Long|null);

                    /** Bar Count */
                    Count?: (number|null);
                }

                /** Represents a Bar. */
                class Bar implements IBar {

                    /**
                     * Constructs a new Bar.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IBar);

                    /** Bar Time. */
                    public Time?: (google.protobuf.ITimestamp|null);

                    /** Bar High. */
                    public High: number;

                    /** Bar Low. */
                    public Low: number;

                    /** Bar Open. */
                    public Open: number;

                    /** Bar Close. */
                    public Close: number;

                    /** Bar Wap. */
                    public Wap: number;

                    /** Bar Volume. */
                    public Volume: (number|Long);

                    /** Bar Count. */
                    public Count: number;

                    /**
                     * Creates a new Bar instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Bar instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IBar): Jde.Markets.Proto.Results.Bar;

                    /**
                     * Encodes the specified Bar message. Does not implicitly {@link Jde.Markets.Proto.Results.Bar.verify|verify} messages.
                     * @param message Bar message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IBar, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Bar message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Bar.verify|verify} messages.
                     * @param message Bar message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IBar, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Bar message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Bar
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Bar;

                    /**
                     * Decodes a Bar message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Bar
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Bar;

                    /**
                     * Verifies a Bar message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Bar message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Bar
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Bar;

                    /**
                     * Creates a plain object from a Bar message. Also converts values to other types if specified.
                     * @param message Bar
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Bar, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Bar to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a HistoricalData. */
                interface IHistoricalData {

                    /** HistoricalData RequestId */
                    RequestId?: (number|null);

                    /** HistoricalData Bars */
                    Bars?: (Jde.Markets.Proto.Results.IBar[]|null);
                }

                /** Represents a HistoricalData. */
                class HistoricalData implements IHistoricalData {

                    /**
                     * Constructs a new HistoricalData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IHistoricalData);

                    /** HistoricalData RequestId. */
                    public RequestId: number;

                    /** HistoricalData Bars. */
                    public Bars: Jde.Markets.Proto.Results.IBar[];

                    /**
                     * Creates a new HistoricalData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns HistoricalData instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IHistoricalData): Jde.Markets.Proto.Results.HistoricalData;

                    /**
                     * Encodes the specified HistoricalData message. Does not implicitly {@link Jde.Markets.Proto.Results.HistoricalData.verify|verify} messages.
                     * @param message HistoricalData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IHistoricalData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified HistoricalData message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.HistoricalData.verify|verify} messages.
                     * @param message HistoricalData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IHistoricalData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a HistoricalData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns HistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.HistoricalData;

                    /**
                     * Decodes a HistoricalData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns HistoricalData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.HistoricalData;

                    /**
                     * Verifies a HistoricalData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a HistoricalData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns HistoricalData
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.HistoricalData;

                    /**
                     * Creates a plain object from a HistoricalData message. Also converts values to other types if specified.
                     * @param message HistoricalData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.HistoricalData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this HistoricalData to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a PortfolioUpdate. */
                interface IPortfolioUpdate {

                    /** PortfolioUpdate Contract */
                    Contract?: (Jde.Markets.Proto.IContract|null);

                    /** PortfolioUpdate Position */
                    Position?: (number|null);

                    /** PortfolioUpdate MarketPrice */
                    MarketPrice?: (number|null);

                    /** PortfolioUpdate MarketValue */
                    MarketValue?: (number|null);

                    /** PortfolioUpdate AverageCost */
                    AverageCost?: (number|null);

                    /** PortfolioUpdate UnrealizedPnl */
                    UnrealizedPnl?: (number|null);

                    /** PortfolioUpdate RealizedPnl */
                    RealizedPnl?: (number|null);

                    /** PortfolioUpdate AccountNumber */
                    AccountNumber?: (string|null);
                }

                /** Represents a PortfolioUpdate. */
                class PortfolioUpdate implements IPortfolioUpdate {

                    /**
                     * Constructs a new PortfolioUpdate.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IPortfolioUpdate);

                    /** PortfolioUpdate Contract. */
                    public Contract?: (Jde.Markets.Proto.IContract|null);

                    /** PortfolioUpdate Position. */
                    public Position: number;

                    /** PortfolioUpdate MarketPrice. */
                    public MarketPrice: number;

                    /** PortfolioUpdate MarketValue. */
                    public MarketValue: number;

                    /** PortfolioUpdate AverageCost. */
                    public AverageCost: number;

                    /** PortfolioUpdate UnrealizedPnl. */
                    public UnrealizedPnl: number;

                    /** PortfolioUpdate RealizedPnl. */
                    public RealizedPnl: number;

                    /** PortfolioUpdate AccountNumber. */
                    public AccountNumber: string;

                    /**
                     * Creates a new PortfolioUpdate instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PortfolioUpdate instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IPortfolioUpdate): Jde.Markets.Proto.Results.PortfolioUpdate;

                    /**
                     * Encodes the specified PortfolioUpdate message. Does not implicitly {@link Jde.Markets.Proto.Results.PortfolioUpdate.verify|verify} messages.
                     * @param message PortfolioUpdate message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IPortfolioUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PortfolioUpdate message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.PortfolioUpdate.verify|verify} messages.
                     * @param message PortfolioUpdate message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IPortfolioUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PortfolioUpdate message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PortfolioUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.PortfolioUpdate;

                    /**
                     * Decodes a PortfolioUpdate message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PortfolioUpdate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.PortfolioUpdate;

                    /**
                     * Verifies a PortfolioUpdate message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PortfolioUpdate message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PortfolioUpdate
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.PortfolioUpdate;

                    /**
                     * Creates a plain object from a PortfolioUpdate message. Also converts values to other types if specified.
                     * @param message PortfolioUpdate
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.PortfolioUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PortfolioUpdate to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Order. */
                interface IOrder {

                    /** Order Id */
                    Id?: (number|null);

                    /** Order AccountId */
                    AccountId?: (string|null);

                    /** Order Symbol */
                    Symbol?: (string|null);

                    /** Order Conid */
                    Conid?: (number|null);

                    /** Order Date */
                    Date?: (number|null);

                    /** Order BuySell */
                    BuySell?: (string|null);

                    /** Order Quantity */
                    Quantity?: (number|null);

                    /** Order Price */
                    Price?: (number|null);

                    /** Order Commission */
                    Commission?: (number|null);

                    /** Order OrderType */
                    OrderType?: (string|null);

                    /** Order OrderTime */
                    OrderTime?: (number|null);
                }

                /** Represents an Order. */
                class Order implements IOrder {

                    /**
                     * Constructs a new Order.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IOrder);

                    /** Order Id. */
                    public Id: number;

                    /** Order AccountId. */
                    public AccountId: string;

                    /** Order Symbol. */
                    public Symbol: string;

                    /** Order Conid. */
                    public Conid: number;

                    /** Order Date. */
                    public Date: number;

                    /** Order BuySell. */
                    public BuySell: string;

                    /** Order Quantity. */
                    public Quantity: number;

                    /** Order Price. */
                    public Price: number;

                    /** Order Commission. */
                    public Commission: number;

                    /** Order OrderType. */
                    public OrderType: string;

                    /** Order OrderTime. */
                    public OrderTime: number;

                    /**
                     * Creates a new Order instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Order instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IOrder): Jde.Markets.Proto.Results.Order;

                    /**
                     * Encodes the specified Order message. Does not implicitly {@link Jde.Markets.Proto.Results.Order.verify|verify} messages.
                     * @param message Order message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IOrder, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Order message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Order.verify|verify} messages.
                     * @param message Order message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IOrder, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Order message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Order
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Order;

                    /**
                     * Decodes an Order message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Order
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Order;

                    /**
                     * Verifies an Order message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Order message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Order
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Order;

                    /**
                     * Creates a plain object from an Order message. Also converts values to other types if specified.
                     * @param message Order
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Order, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Order to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Trade. */
                interface ITrade {

                    /** Trade OrderId */
                    OrderId?: (number|null);

                    /** Trade AccountId */
                    AccountId?: (string|null);

                    /** Trade Symbol */
                    Symbol?: (string|null);

                    /** Trade Conid */
                    Conid?: (number|null);

                    /** Trade Date */
                    Date?: (number|null);

                    /** Trade BuySell */
                    BuySell?: (string|null);

                    /** Trade Quantity */
                    Quantity?: (number|null);

                    /** Trade Price */
                    Price?: (number|null);

                    /** Trade Commission */
                    Commission?: (number|null);

                    /** Trade OrderType */
                    OrderType?: (string|null);

                    /** Trade OrderTime */
                    OrderTime?: (number|null);

                    /** Trade Id */
                    Id?: (number|null);

                    /** Trade ExecId */
                    ExecId?: (string|null);

                    /** Trade IsApi */
                    IsApi?: (boolean|null);
                }

                /** Represents a Trade. */
                class Trade implements ITrade {

                    /**
                     * Constructs a new Trade.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITrade);

                    /** Trade OrderId. */
                    public OrderId: number;

                    /** Trade AccountId. */
                    public AccountId: string;

                    /** Trade Symbol. */
                    public Symbol: string;

                    /** Trade Conid. */
                    public Conid: number;

                    /** Trade Date. */
                    public Date: number;

                    /** Trade BuySell. */
                    public BuySell: string;

                    /** Trade Quantity. */
                    public Quantity: number;

                    /** Trade Price. */
                    public Price: number;

                    /** Trade Commission. */
                    public Commission: number;

                    /** Trade OrderType. */
                    public OrderType: string;

                    /** Trade OrderTime. */
                    public OrderTime: number;

                    /** Trade Id. */
                    public Id: number;

                    /** Trade ExecId. */
                    public ExecId: string;

                    /** Trade IsApi. */
                    public IsApi: boolean;

                    /**
                     * Creates a new Trade instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Trade instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITrade): Jde.Markets.Proto.Results.Trade;

                    /**
                     * Encodes the specified Trade message. Does not implicitly {@link Jde.Markets.Proto.Results.Trade.verify|verify} messages.
                     * @param message Trade message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITrade, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Trade message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Trade.verify|verify} messages.
                     * @param message Trade message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITrade, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Trade message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Trade
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Trade;

                    /**
                     * Decodes a Trade message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Trade
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Trade;

                    /**
                     * Verifies a Trade message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Trade message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Trade
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Trade;

                    /**
                     * Creates a plain object from a Trade message. Also converts values to other types if specified.
                     * @param message Trade
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Trade, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Trade to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Flex. */
                interface IFlex {

                    /** Flex RequestId */
                    RequestId?: (number|null);

                    /** Flex Orders */
                    Orders?: (Jde.Markets.Proto.Results.IOrder[]|null);

                    /** Flex Trades */
                    Trades?: (Jde.Markets.Proto.Results.ITrade[]|null);
                }

                /** Represents a Flex. */
                class Flex implements IFlex {

                    /**
                     * Constructs a new Flex.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IFlex);

                    /** Flex RequestId. */
                    public RequestId: number;

                    /** Flex Orders. */
                    public Orders: Jde.Markets.Proto.Results.IOrder[];

                    /** Flex Trades. */
                    public Trades: Jde.Markets.Proto.Results.ITrade[];

                    /**
                     * Creates a new Flex instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Flex instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IFlex): Jde.Markets.Proto.Results.Flex;

                    /**
                     * Encodes the specified Flex message. Does not implicitly {@link Jde.Markets.Proto.Results.Flex.verify|verify} messages.
                     * @param message Flex message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IFlex, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Flex message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Flex.verify|verify} messages.
                     * @param message Flex message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IFlex, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Flex message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Flex
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Flex;

                    /**
                     * Decodes a Flex message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Flex
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Flex;

                    /**
                     * Verifies a Flex message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Flex message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Flex
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Flex;

                    /**
                     * Creates a plain object from a Flex message. Also converts values to other types if specified.
                     * @param message Flex
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Flex, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Flex to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Error. */
                interface IError {

                    /** Error RequestId */
                    RequestId?: (number|null);

                    /** Error Code */
                    Code?: (number|null);

                    /** Error Message */
                    Message?: (string|null);
                }

                /** Represents an Error. */
                class Error implements IError {

                    /**
                     * Constructs a new Error.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IError);

                    /** Error RequestId. */
                    public RequestId: number;

                    /** Error Code. */
                    public Code: number;

                    /** Error Message. */
                    public Message: string;

                    /**
                     * Creates a new Error instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Error instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IError): Jde.Markets.Proto.Results.Error;

                    /**
                     * Encodes the specified Error message. Does not implicitly {@link Jde.Markets.Proto.Results.Error.verify|verify} messages.
                     * @param message Error message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IError, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Error message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Error.verify|verify} messages.
                     * @param message Error message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IError, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Error message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Error
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Error;

                    /**
                     * Decodes an Error message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Error
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Error;

                    /**
                     * Verifies an Error message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Error message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Error
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Error;

                    /**
                     * Creates a plain object from an Error message. Also converts values to other types if specified.
                     * @param message Error
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Error to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Option. */
                interface IOption {

                    /** Option ContractId */
                    ContractId?: (number|null);

                    /** Option Strike */
                    Strike?: (number|null);

                    /** Option Bid */
                    Bid?: (number|null);

                    /** Option Ask */
                    Ask?: (number|null);

                    /** Option Last */
                    Last?: (number|null);

                    /** Option Volume */
                    Volume?: (number|null);

                    /** Option OpenInterest */
                    OpenInterest?: (number|null);

                    /** Option OIChange */
                    OIChange?: (number|null);

                    /** Option PreviousPrice */
                    PreviousPrice?: (number|null);
                }

                /** Represents an Option. */
                class Option implements IOption {

                    /**
                     * Constructs a new Option.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IOption);

                    /** Option ContractId. */
                    public ContractId: number;

                    /** Option Strike. */
                    public Strike: number;

                    /** Option Bid. */
                    public Bid: number;

                    /** Option Ask. */
                    public Ask: number;

                    /** Option Last. */
                    public Last: number;

                    /** Option Volume. */
                    public Volume: number;

                    /** Option OpenInterest. */
                    public OpenInterest: number;

                    /** Option OIChange. */
                    public OIChange: number;

                    /** Option PreviousPrice. */
                    public PreviousPrice: number;

                    /**
                     * Creates a new Option instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Option instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IOption): Jde.Markets.Proto.Results.Option;

                    /**
                     * Encodes the specified Option message. Does not implicitly {@link Jde.Markets.Proto.Results.Option.verify|verify} messages.
                     * @param message Option message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IOption, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Option message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Option.verify|verify} messages.
                     * @param message Option message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IOption, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Option message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Option
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Option;

                    /**
                     * Decodes an Option message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Option
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Option;

                    /**
                     * Verifies an Option message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Option message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Option
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Option;

                    /**
                     * Creates a plain object from an Option message. Also converts values to other types if specified.
                     * @param message Option
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Option, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Option to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an OptionDay. */
                interface IOptionDay {

                    /** OptionDay IsCall */
                    IsCall?: (boolean|null);

                    /** OptionDay ExpirationDays */
                    ExpirationDays?: (number|null);

                    /** OptionDay Values */
                    Values?: (Jde.Markets.Proto.Results.IOption[]|null);
                }

                /** Represents an OptionDay. */
                class OptionDay implements IOptionDay {

                    /**
                     * Constructs a new OptionDay.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IOptionDay);

                    /** OptionDay IsCall. */
                    public IsCall: boolean;

                    /** OptionDay ExpirationDays. */
                    public ExpirationDays: number;

                    /** OptionDay Values. */
                    public Values: Jde.Markets.Proto.Results.IOption[];

                    /**
                     * Creates a new OptionDay instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns OptionDay instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IOptionDay): Jde.Markets.Proto.Results.OptionDay;

                    /**
                     * Encodes the specified OptionDay message. Does not implicitly {@link Jde.Markets.Proto.Results.OptionDay.verify|verify} messages.
                     * @param message OptionDay message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IOptionDay, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified OptionDay message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.OptionDay.verify|verify} messages.
                     * @param message OptionDay message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IOptionDay, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an OptionDay message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns OptionDay
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.OptionDay;

                    /**
                     * Decodes an OptionDay message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns OptionDay
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.OptionDay;

                    /**
                     * Verifies an OptionDay message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an OptionDay message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns OptionDay
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.OptionDay;

                    /**
                     * Creates a plain object from an OptionDay message. Also converts values to other types if specified.
                     * @param message OptionDay
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.OptionDay, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this OptionDay to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an OptionValues. */
                interface IOptionValues {

                    /** OptionValues RequestId */
                    RequestId?: (number|null);

                    /** OptionValues OptionDays */
                    OptionDays?: (Jde.Markets.Proto.Results.IOptionDay[]|null);
                }

                /** Represents an OptionValues. */
                class OptionValues implements IOptionValues {

                    /**
                     * Constructs a new OptionValues.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IOptionValues);

                    /** OptionValues RequestId. */
                    public RequestId: number;

                    /** OptionValues OptionDays. */
                    public OptionDays: Jde.Markets.Proto.Results.IOptionDay[];

                    /**
                     * Creates a new OptionValues instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns OptionValues instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IOptionValues): Jde.Markets.Proto.Results.OptionValues;

                    /**
                     * Encodes the specified OptionValues message. Does not implicitly {@link Jde.Markets.Proto.Results.OptionValues.verify|verify} messages.
                     * @param message OptionValues message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IOptionValues, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified OptionValues message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.OptionValues.verify|verify} messages.
                     * @param message OptionValues message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IOptionValues, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an OptionValues message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns OptionValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.OptionValues;

                    /**
                     * Decodes an OptionValues message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns OptionValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.OptionValues;

                    /**
                     * Verifies an OptionValues message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an OptionValues message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns OptionValues
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.OptionValues;

                    /**
                     * Creates a plain object from an OptionValues message. Also converts values to other types if specified.
                     * @param message OptionValues
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.OptionValues, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this OptionValues to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MessageUnion. */
                interface IMessageUnion {

                    /** MessageUnion Position */
                    Position?: (Jde.Markets.Proto.Results.IPosition|null);

                    /** MessageUnion Contract */
                    Contract?: (Jde.Markets.Proto.IContract|null);

                    /** MessageUnion Message */
                    Message?: (Jde.Markets.Proto.Results.IMessageValue|null);

                    /** MessageUnion AccountList */
                    AccountList?: (Jde.Markets.Proto.Results.IAccountList|null);

                    /** MessageUnion AccountUpdate */
                    AccountUpdate?: (Jde.Markets.Proto.Results.IAccountUpdate|null);

                    /** MessageUnion AccountUpdateMulti */
                    AccountUpdateMulti?: (Jde.Markets.Proto.Results.IAccountUpdateMulti|null);

                    /** MessageUnion PortfolioUpdate */
                    PortfolioUpdate?: (Jde.Markets.Proto.Results.IPortfolioUpdate|null);

                    /** MessageUnion TickGeneric */
                    TickGeneric?: (Jde.Markets.Proto.Results.ITickGeneric|null);

                    /** MessageUnion TickPrice */
                    TickPrice?: (Jde.Markets.Proto.Results.ITickPrice|null);

                    /** MessageUnion TickSize */
                    TickSize?: (Jde.Markets.Proto.Results.ITickSize|null);

                    /** MessageUnion TickString */
                    TickString?: (Jde.Markets.Proto.Results.ITickString|null);

                    /** MessageUnion ContractDetails */
                    ContractDetails?: (Jde.Markets.Proto.Results.IContractDetails|null);

                    /** MessageUnion Error */
                    Error?: (Jde.Markets.Proto.Results.IError|null);

                    /** MessageUnion Options */
                    Options?: (Jde.Markets.Proto.Results.IOptionValues|null);

                    /** MessageUnion HistoricalData */
                    HistoricalData?: (Jde.Markets.Proto.Results.IHistoricalData|null);

                    /** MessageUnion StringResult */
                    StringResult?: (Jde.Markets.Proto.Results.IStringResult|null);

                    /** MessageUnion Flex */
                    Flex?: (Jde.Markets.Proto.Results.IFlex|null);
                }

                /** Represents a MessageUnion. */
                class MessageUnion implements IMessageUnion {

                    /**
                     * Constructs a new MessageUnion.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.IMessageUnion);

                    /** MessageUnion Position. */
                    public Position?: (Jde.Markets.Proto.Results.IPosition|null);

                    /** MessageUnion Contract. */
                    public Contract?: (Jde.Markets.Proto.IContract|null);

                    /** MessageUnion Message. */
                    public Message?: (Jde.Markets.Proto.Results.IMessageValue|null);

                    /** MessageUnion AccountList. */
                    public AccountList?: (Jde.Markets.Proto.Results.IAccountList|null);

                    /** MessageUnion AccountUpdate. */
                    public AccountUpdate?: (Jde.Markets.Proto.Results.IAccountUpdate|null);

                    /** MessageUnion AccountUpdateMulti. */
                    public AccountUpdateMulti?: (Jde.Markets.Proto.Results.IAccountUpdateMulti|null);

                    /** MessageUnion PortfolioUpdate. */
                    public PortfolioUpdate?: (Jde.Markets.Proto.Results.IPortfolioUpdate|null);

                    /** MessageUnion TickGeneric. */
                    public TickGeneric?: (Jde.Markets.Proto.Results.ITickGeneric|null);

                    /** MessageUnion TickPrice. */
                    public TickPrice?: (Jde.Markets.Proto.Results.ITickPrice|null);

                    /** MessageUnion TickSize. */
                    public TickSize?: (Jde.Markets.Proto.Results.ITickSize|null);

                    /** MessageUnion TickString. */
                    public TickString?: (Jde.Markets.Proto.Results.ITickString|null);

                    /** MessageUnion ContractDetails. */
                    public ContractDetails?: (Jde.Markets.Proto.Results.IContractDetails|null);

                    /** MessageUnion Error. */
                    public Error?: (Jde.Markets.Proto.Results.IError|null);

                    /** MessageUnion Options. */
                    public Options?: (Jde.Markets.Proto.Results.IOptionValues|null);

                    /** MessageUnion HistoricalData. */
                    public HistoricalData?: (Jde.Markets.Proto.Results.IHistoricalData|null);

                    /** MessageUnion StringResult. */
                    public StringResult?: (Jde.Markets.Proto.Results.IStringResult|null);

                    /** MessageUnion Flex. */
                    public Flex?: (Jde.Markets.Proto.Results.IFlex|null);

                    /** MessageUnion Value. */
                    public Value?: ("Position"|"Contract"|"Message"|"AccountList"|"AccountUpdate"|"AccountUpdateMulti"|"PortfolioUpdate"|"TickGeneric"|"TickPrice"|"TickSize"|"TickString"|"ContractDetails"|"Error"|"Options"|"HistoricalData"|"StringResult"|"Flex");

                    /**
                     * Creates a new MessageUnion instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MessageUnion instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.IMessageUnion): Jde.Markets.Proto.Results.MessageUnion;

                    /**
                     * Encodes the specified MessageUnion message. Does not implicitly {@link Jde.Markets.Proto.Results.MessageUnion.verify|verify} messages.
                     * @param message MessageUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.IMessageUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MessageUnion message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.MessageUnion.verify|verify} messages.
                     * @param message MessageUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.IMessageUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.MessageUnion;

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.MessageUnion;

                    /**
                     * Verifies a MessageUnion message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MessageUnion message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MessageUnion
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.MessageUnion;

                    /**
                     * Creates a plain object from a MessageUnion message. Also converts values to other types if specified.
                     * @param message MessageUnion
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.MessageUnion, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MessageUnion to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Transmission. */
                interface ITransmission {

                    /** Transmission Messages */
                    Messages?: (Jde.Markets.Proto.Results.IMessageUnion[]|null);
                }

                /** Represents a Transmission. */
                class Transmission implements ITransmission {

                    /**
                     * Constructs a new Transmission.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITransmission);

                    /** Transmission Messages. */
                    public Messages: Jde.Markets.Proto.Results.IMessageUnion[];

                    /**
                     * Creates a new Transmission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Transmission instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITransmission): Jde.Markets.Proto.Results.Transmission;

                    /**
                     * Encodes the specified Transmission message. Does not implicitly {@link Jde.Markets.Proto.Results.Transmission.verify|verify} messages.
                     * @param message Transmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Transmission message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.Transmission.verify|verify} messages.
                     * @param message Transmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Transmission message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.Transmission;

                    /**
                     * Decodes a Transmission message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.Transmission;

                    /**
                     * Verifies a Transmission message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Transmission message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Transmission
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.Transmission;

                    /**
                     * Creates a plain object from a Transmission message. Also converts values to other types if specified.
                     * @param message Transmission
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.Transmission, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Transmission to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TickGeneric. */
                interface ITickGeneric {

                    /** TickGeneric RequestId */
                    RequestId?: (number|null);

                    /** TickGeneric TickType */
                    TickType?: (Jde.Markets.Proto.Results.ETickType|null);

                    /** TickGeneric Value */
                    Value?: (number|null);
                }

                /** Represents a TickGeneric. */
                class TickGeneric implements ITickGeneric {

                    /**
                     * Constructs a new TickGeneric.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITickGeneric);

                    /** TickGeneric RequestId. */
                    public RequestId: number;

                    /** TickGeneric TickType. */
                    public TickType: Jde.Markets.Proto.Results.ETickType;

                    /** TickGeneric Value. */
                    public Value: number;

                    /**
                     * Creates a new TickGeneric instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TickGeneric instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITickGeneric): Jde.Markets.Proto.Results.TickGeneric;

                    /**
                     * Encodes the specified TickGeneric message. Does not implicitly {@link Jde.Markets.Proto.Results.TickGeneric.verify|verify} messages.
                     * @param message TickGeneric message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITickGeneric, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TickGeneric message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickGeneric.verify|verify} messages.
                     * @param message TickGeneric message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITickGeneric, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TickGeneric message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TickGeneric
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.TickGeneric;

                    /**
                     * Decodes a TickGeneric message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TickGeneric
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.TickGeneric;

                    /**
                     * Verifies a TickGeneric message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TickGeneric message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TickGeneric
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.TickGeneric;

                    /**
                     * Creates a plain object from a TickGeneric message. Also converts values to other types if specified.
                     * @param message TickGeneric
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.TickGeneric, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TickGeneric to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TickAttrib. */
                interface ITickAttrib {

                    /** TickAttrib CanAutoExecute */
                    CanAutoExecute?: (boolean|null);

                    /** TickAttrib PastLimit */
                    PastLimit?: (boolean|null);

                    /** TickAttrib PreOpen */
                    PreOpen?: (boolean|null);
                }

                /** Represents a TickAttrib. */
                class TickAttrib implements ITickAttrib {

                    /**
                     * Constructs a new TickAttrib.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITickAttrib);

                    /** TickAttrib CanAutoExecute. */
                    public CanAutoExecute: boolean;

                    /** TickAttrib PastLimit. */
                    public PastLimit: boolean;

                    /** TickAttrib PreOpen. */
                    public PreOpen: boolean;

                    /**
                     * Creates a new TickAttrib instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TickAttrib instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITickAttrib): Jde.Markets.Proto.Results.TickAttrib;

                    /**
                     * Encodes the specified TickAttrib message. Does not implicitly {@link Jde.Markets.Proto.Results.TickAttrib.verify|verify} messages.
                     * @param message TickAttrib message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITickAttrib, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TickAttrib message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickAttrib.verify|verify} messages.
                     * @param message TickAttrib message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITickAttrib, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TickAttrib message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TickAttrib
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.TickAttrib;

                    /**
                     * Decodes a TickAttrib message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TickAttrib
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.TickAttrib;

                    /**
                     * Verifies a TickAttrib message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TickAttrib message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TickAttrib
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.TickAttrib;

                    /**
                     * Creates a plain object from a TickAttrib message. Also converts values to other types if specified.
                     * @param message TickAttrib
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.TickAttrib, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TickAttrib to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TickPrice. */
                interface ITickPrice {

                    /** TickPrice RequestId */
                    RequestId?: (number|null);

                    /** TickPrice TickType */
                    TickType?: (Jde.Markets.Proto.Results.ETickType|null);

                    /** TickPrice Price */
                    Price?: (number|null);

                    /** TickPrice Attributes */
                    Attributes?: (Jde.Markets.Proto.Results.ITickAttrib|null);
                }

                /** Represents a TickPrice. */
                class TickPrice implements ITickPrice {

                    /**
                     * Constructs a new TickPrice.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITickPrice);

                    /** TickPrice RequestId. */
                    public RequestId: number;

                    /** TickPrice TickType. */
                    public TickType: Jde.Markets.Proto.Results.ETickType;

                    /** TickPrice Price. */
                    public Price: number;

                    /** TickPrice Attributes. */
                    public Attributes?: (Jde.Markets.Proto.Results.ITickAttrib|null);

                    /**
                     * Creates a new TickPrice instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TickPrice instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITickPrice): Jde.Markets.Proto.Results.TickPrice;

                    /**
                     * Encodes the specified TickPrice message. Does not implicitly {@link Jde.Markets.Proto.Results.TickPrice.verify|verify} messages.
                     * @param message TickPrice message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITickPrice, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TickPrice message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickPrice.verify|verify} messages.
                     * @param message TickPrice message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITickPrice, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TickPrice message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TickPrice
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.TickPrice;

                    /**
                     * Decodes a TickPrice message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TickPrice
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.TickPrice;

                    /**
                     * Verifies a TickPrice message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TickPrice message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TickPrice
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.TickPrice;

                    /**
                     * Creates a plain object from a TickPrice message. Also converts values to other types if specified.
                     * @param message TickPrice
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.TickPrice, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TickPrice to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TickSize. */
                interface ITickSize {

                    /** TickSize RequestId */
                    RequestId?: (number|null);

                    /** TickSize TickType */
                    TickType?: (Jde.Markets.Proto.Results.ETickType|null);

                    /** TickSize Size */
                    Size?: (number|null);
                }

                /** Represents a TickSize. */
                class TickSize implements ITickSize {

                    /**
                     * Constructs a new TickSize.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITickSize);

                    /** TickSize RequestId. */
                    public RequestId: number;

                    /** TickSize TickType. */
                    public TickType: Jde.Markets.Proto.Results.ETickType;

                    /** TickSize Size. */
                    public Size: number;

                    /**
                     * Creates a new TickSize instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TickSize instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITickSize): Jde.Markets.Proto.Results.TickSize;

                    /**
                     * Encodes the specified TickSize message. Does not implicitly {@link Jde.Markets.Proto.Results.TickSize.verify|verify} messages.
                     * @param message TickSize message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITickSize, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TickSize message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickSize.verify|verify} messages.
                     * @param message TickSize message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITickSize, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TickSize message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TickSize
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.TickSize;

                    /**
                     * Decodes a TickSize message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TickSize
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.TickSize;

                    /**
                     * Verifies a TickSize message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TickSize message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TickSize
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.TickSize;

                    /**
                     * Creates a plain object from a TickSize message. Also converts values to other types if specified.
                     * @param message TickSize
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.TickSize, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TickSize to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TickString. */
                interface ITickString {

                    /** TickString RequestId */
                    RequestId?: (number|null);

                    /** TickString TickType */
                    TickType?: (Jde.Markets.Proto.Results.ETickType|null);

                    /** TickString Value */
                    Value?: (string|null);
                }

                /** Represents a TickString. */
                class TickString implements ITickString {

                    /**
                     * Constructs a new TickString.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.Markets.Proto.Results.ITickString);

                    /** TickString RequestId. */
                    public RequestId: number;

                    /** TickString TickType. */
                    public TickType: Jde.Markets.Proto.Results.ETickType;

                    /** TickString Value. */
                    public Value: string;

                    /**
                     * Creates a new TickString instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TickString instance
                     */
                    public static create(properties?: Jde.Markets.Proto.Results.ITickString): Jde.Markets.Proto.Results.TickString;

                    /**
                     * Encodes the specified TickString message. Does not implicitly {@link Jde.Markets.Proto.Results.TickString.verify|verify} messages.
                     * @param message TickString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.Markets.Proto.Results.ITickString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TickString message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Results.TickString.verify|verify} messages.
                     * @param message TickString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.Markets.Proto.Results.ITickString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TickString message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TickString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Results.TickString;

                    /**
                     * Decodes a TickString message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TickString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Results.TickString;

                    /**
                     * Verifies a TickString message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TickString message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TickString
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Results.TickString;

                    /**
                     * Creates a plain object from a TickString message. Also converts values to other types if specified.
                     * @param message TickString
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.Markets.Proto.Results.TickString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TickString to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** ETickType enum. */
                enum ETickType {
                    BidSize = 0,
                    BidPrice = 1,
                    AskPrice = 2,
                    AskSize = 3,
                    LastPrice = 4,
                    LastSize = 5,
                    High = 6,
                    Low = 7,
                    Volume = 8,
                    ClosePrice = 9,
                    BID_OPTION_COMPUTATION = 10,
                    ASK_OPTION_COMPUTATION = 11,
                    LAST_OPTION_COMPUTATION = 12,
                    MODEL_OPTION = 13,
                    OpenTick = 14,
                    LOW_13_WEEK = 15,
                    HIGH_13_WEEK = 16,
                    LOW_26_WEEK = 17,
                    HIGH_26_WEEK = 18,
                    LOW_52_WEEK = 19,
                    HIGH_52_WEEK = 20,
                    AVG_VOLUME = 21,
                    OPEN_INTEREST = 22,
                    OPTION_HISTORICAL_VOL = 23,
                    OPTION_IMPLIED_VOL = 24,
                    OPTION_BID_EXCH = 25,
                    OPTION_ASK_EXCH = 26,
                    OPTION_CALL_OPEN_INTEREST = 27,
                    OPTION_PUT_OPEN_INTEREST = 28,
                    OPTION_CALL_VOLUME = 29,
                    OPTION_PUT_VOLUME = 30,
                    INDEX_FUTURE_PREMIUM = 31,
                    BidExchange = 32,
                    AskExchange = 33,
                    AUCTION_VOLUME = 34,
                    AUCTION_PRICE = 35,
                    AUCTION_IMBALANCE = 36,
                    MARK_PRICE = 37,
                    BID_EFP_COMPUTATION = 38,
                    ASK_EFP_COMPUTATION = 39,
                    LAST_EFP_COMPUTATION = 40,
                    OPEN_EFP_COMPUTATION = 41,
                    HIGH_EFP_COMPUTATION = 42,
                    LOW_EFP_COMPUTATION = 43,
                    CLOSE_EFP_COMPUTATION = 44,
                    LastTimestamp = 45,
                    SHORTABLE = 46,
                    FUNDAMENTAL_RATIOS = 47,
                    RT_VOLUME = 48,
                    Halted = 49,
                    BID_YIELD = 50,
                    ASK_YIELD = 51,
                    LAST_YIELD = 52,
                    CUST_OPTION_COMPUTATION = 53,
                    TRADE_COUNT = 54,
                    TRADE_RATE = 55,
                    VOLUME_RATE = 56,
                    LAST_RTH_TRADE = 57,
                    RT_HISTORICAL_VOL = 58,
                    IB_DIVIDENDS = 59,
                    BOND_FACTOR_MULTIPLIER = 60,
                    REGULATORY_IMBALANCE = 61,
                    NEWS_TICK = 62,
                    SHORT_TERM_VOLUME_3_MIN = 63,
                    SHORT_TERM_VOLUME_5_MIN = 64,
                    SHORT_TERM_VOLUME_10_MIN = 65,
                    DELAYED_BID = 66,
                    DELAYED_ASK = 67,
                    DELAYED_LAST = 68,
                    DELAYED_BID_SIZE = 69,
                    DELAYED_ASK_SIZE = 70,
                    DELAYED_LAST_SIZE = 71,
                    DELAYED_HIGH = 72,
                    DELAYED_LOW = 73,
                    DELAYED_VOLUME = 74,
                    DELAYED_CLOSE = 75,
                    DELAYED_OPEN = 76,
                    RT_TRD_VOLUME = 77,
                    CREDITMAN_MARK_PRICE = 78,
                    CREDITMAN_SLOW_MARK_PRICE = 79,
                    DELAYED_BID_OPTION_COMPUTATION = 80,
                    DELAYED_ASK_OPTION_COMPUTATION = 81,
                    DELAYED_LAST_OPTION_COMPUTATION = 82,
                    DELAYED_MODEL_OPTION_COMPUTATION = 83,
                    LastExchange = 84,
                    LAST_REG_TIME = 85,
                    FUTURES_OPEN_INTEREST = 86,
                    AVG_OPT_VOLUME = 87,
                    DELAYED_LAST_TIMESTAMP = 88,
                    SHORTABLE_SHARES = 89,
                    NOT_SET = 90
                }

                /** EResults enum. */
                enum EResults {
                    Accept = 0,
                    MultiEnd = -1,
                    TickPriceMessage = 1,
                    TickSizeMessage = 2,
                    OrderStatus = 3,
                    ErrorMessage = 4,
                    OpenOrder = 5,
                    ACCT_VALUE = 6,
                    PORTFOLIO_VALUE = 7,
                    ACCT_UPDATE_TIME = 8,
                    NextValidId = 9,
                    CONTRACT_DATA = 10,
                    ExecutionData = 11,
                    MARKET_DEPTH = 12,
                    MARKET_DEPTH_L2 = 13,
                    NEWS_BULLETINS = 14,
                    ManagedAccounts = 15,
                    RECEIVE_FA = 16,
                    HistoricalData_ = 17,
                    BOND_CONTRACT_DATA = 18,
                    SCANNER_PARAMETERS = 19,
                    SCANNER_DATA = 20,
                    TICK_OPTION_COMPUTATION = 21,
                    TickGenericMessage = 45,
                    TickStringMessage = 46,
                    TICK_EFP = 47,
                    CurrentTime = 49,
                    RealTimeBars = 50,
                    FUNDAMENTAL_DATA = 51,
                    ContractDataEnd = 52,
                    OPEN_ORDER_END = 53,
                    ACCT_DOWNLOAD_END = 54,
                    EXECUTION_DATA_END = 55,
                    DELTA_NEUTRAL_VALIDATION = 56,
                    TickSnapshotEnd = 57,
                    MarketDataType = 58,
                    COMMISSION_REPORT = 59,
                    PositionData = 61,
                    PositionEnd = 62,
                    ACCOUNT_SUMMARY = 63,
                    ACCOUNT_SUMMARY_END = 64,
                    VERIFY_MESSAGE_API = 65,
                    VERIFY_COMPLETED = 66,
                    DISPLAY_GROUP_LIST = 67,
                    DISPLAY_GROUP_UPDATED = 68,
                    VERIFY_AND_AUTH_MESSAGE_API = 69,
                    VERIFY_AND_AUTH_COMPLETED = 70,
                    PositionMulti = 71,
                    PositionMultiEnd = 72,
                    AccountUpdateMulti_ = 73,
                    ACCOUNT_UPDATE_MULTI_END = 74,
                    SECURITY_DEFINITION_OPTION_PARAMETER = 75,
                    SECURITY_DEFINITION_OPTION_PARAMETER_END = 76,
                    SOFT_DOLLAR_TIERS = 77,
                    FAMILY_CODES = 78,
                    SYMBOL_SAMPLES = 79,
                    MKT_DEPTH_EXCHANGES = 80,
                    TickRequiredParams = 81,
                    SMART_COMPONENTS = 82,
                    NEWS_ARTICLE = 83,
                    TICK_NEWS = 84,
                    NEWS_PROVIDERS = 85,
                    HISTORICAL_NEWS = 86,
                    HISTORICAL_NEWS_END = 87,
                    HEAD_TIMESTAMP = 88,
                    HISTOGRAM_DATA = 89,
                    HISTORICAL_DATA_UPDATE = 90,
                    REROUTE_MKT_DATA_REQ = 91,
                    REROUTE_MKT_DEPTH_REQ = 92,
                    MARKET_RULE = 93,
                    PNL = 94,
                    PNL_SINGLE = 95,
                    HISTORICAL_TICKS = 96,
                    HISTORICAL_TICKS_BID_ASK = 97,
                    HISTORICAL_TICKS_LAST = 98,
                    TICK_BY_TICK = 99
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
