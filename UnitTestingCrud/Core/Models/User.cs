namespace Core.Models
{
    /// <summary>
    /// Represents User entity
    /// </summary>
    public sealed class User
    {
        public string ID { get; set; }

        /// <summary>
        /// User name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User lastname.
        /// </summary>
        public string Lastname { get; set; }

        /// <summary>
        /// Username.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// User email.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// User password.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// User phone
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// User address
        /// </summary>
        public string Address { get; set; }
    }
}
