namespace Core.Contracts
{
    /// <summary>
    /// Represents the operation result contract.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IOperationResult<T>
    {
        string Message { get; }
        bool Success { get; }
        T Entity { get; }
        string MessageDetail { get; }
    }
}
